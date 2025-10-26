import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { z } from 'zod'

// --- Zod Schema Definitions (based on src/types/index.ts) ---

export const SessionSchema = z.object({
  id: z.string().min(1),
  talk_ids: z.array(z.string()).default([]),
  track: z.string().min(1),
  time_start: z.string().min(1),
  time_end: z.string().min(1),
  title: z.string().min(1),
  level: z.array(z.string()).default([]),
  tech_tags: z.array(z.string()).default([]),
  description: z.string().min(1),
  perspective: z.array(z.string()).default([]),
})

export const SpeakerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  bio: z.string().min(1),
  photo_url: z.string().optional().default(''),
  job: z.string().optional().default(''),
  twitter_handle: z.string().optional().default(''),
})

export const TalkSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  abstract: z.string().min(1),
  time_start: z.string().min(1),
  time_end: z.string().min(1),
  track: z.string().min(1),
  speaker_ids: z.array(z.string()).default([]),
  tech_tags: z.array(z.string()).default([]),
  level: z
    .array(
      z.union([
        z.literal('Beginner'),
        z.literal('Intermediate'),
        z.literal('Advanced'),
      ])
    )
    .default([]),
  perspective: z
    .array(
      z.union([
        z.literal('Introduction'),
        z.literal('Experience'),
        z.literal('Challenge'),
      ])
    )
    .default([]),
})

// --- Utility Functions ---

// Function to extract H1 title and first paragraph
function extractTitleAndDescription(markdownContent: string): {
  title: string
  description: string
} {
  let title = ''
  let description = ''
  const tree = unified().use(remarkParse).parse(markdownContent)

  visit(tree, (node) => {
    if (
      node.type === 'heading' &&
      node.depth === 1 &&
      node.children &&
      node.children[0].type === 'text'
    ) {
      title = node.children[0].value as string
    }
    if (
      node.type === 'paragraph' &&
      !description &&
      node.children &&
      node.children[0].type === 'text'
    ) {
      description = (node.children[0].value as string) || ''
    }
  })

  return { title, description }
}

// Function to convert Markdown to HTML
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown)
  return String(result)
}

// --- ID Generation Functions ---

function generateSessionId(folderName: string): string {
  const match = folderName.match(/session-(\d+)-(.+)/)
  if (match) {
    return `s${match[1]}`
  }
  return folderName // Fallback
}

function generateTalkId(sessionId: string, talkFileName: string): string {
  const match = talkFileName.match(/talk-(\d+)\.md/)
  if (match) {
    return `${sessionId}-t${match[1]}`
  }
  return `${sessionId}-${talkFileName.replace('.md', '')}`
}

function generateSpeakerId(xHandle: string | undefined, name: string): string {
  if (xHandle && xHandle.length > 0) {
    return xHandle
  }
  const slugifiedName = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
  if (slugifiedName.length > 0) {
    return slugifiedName
  }
  // Fallback for cases where both xHandle and slugifiedName are empty
  return `speaker_${Math.random().toString(36).substring(2, 9)}` // Generate a random ID
}

// --- Main Parsing Logic ---

async function parseContent() {
  const sessions: z.infer<typeof SessionSchema>[] = []
  const talks: z.infer<typeof TalkSchema>[] = []
  const speakers: z.infer<typeof SpeakerSchema>[] = []

  const docsProdPath = path.join(
    process.cwd(),
    'docs',
    'web',
    'prod',
    'sessions'
  )
  const sessionFolders = fs
    .readdirSync(docsProdPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  for (const sessionFolder of sessionFolders) {
    const sessionFolderPath = path.join(docsProdPath, sessionFolder)
    const sessionId = generateSessionId(sessionFolder)
    const sessionReadmePath = path.join(sessionFolderPath, 'README.md')

    if (fs.existsSync(sessionReadmePath)) {
      const fileContent = fs.readFileSync(sessionReadmePath, 'utf-8')
      const { data: frontmatter, content: markdownBody } = matter(fileContent)
      const { title, description } = extractTitleAndDescription(markdownBody)

      const sessionData = {
        id: sessionId,
        talk_ids: [], // Will be populated later
        track: frontmatter.track || 'Unknown Track',
        time_start: frontmatter.time_start || '00:00',
        time_end: frontmatter.time_end || '00:00',
        title: title,
        level: frontmatter.level || [],
        tech_tags: frontmatter.tech_tags || [],
        description: description,
        perspective: frontmatter.perspective || [],
      }

      const parsedSession = SessionSchema.safeParse(sessionData)
      if (!parsedSession.success) {
        console.error(
          `Validation error for session ${sessionId}:`,
          parsedSession.error
        )
        process.exit(1)
      }
      sessions.push(parsedSession.data)
    }

    const talkFiles = fs
      .readdirSync(sessionFolderPath, { withFileTypes: true })
      .filter(
        (dirent) =>
          dirent.isFile() &&
          dirent.name.startsWith('talk-') &&
          dirent.name.endsWith('.md')
      )
      .map((dirent) => dirent.name)

    for (const talkFile of talkFiles) {
      const talkFilePath = path.join(sessionFolderPath, talkFile)
      const talkId = generateTalkId(sessionId, talkFile)
      const fileContent = fs.readFileSync(talkFilePath, 'utf-8')
      const { data: frontmatter, content: markdownBody } = matter(fileContent)
      const { title, description: abstract } =
        extractTitleAndDescription(markdownBody)

      let speaker_ids: string[] = []
      const speakerSectionMatch = markdownBody.match(
        /## Speaker\n\n### (.+?)\n\n([\s\S]+?)(?=\n##|$)/
      )

      if (speakerSectionMatch) {
        const speakerHeading = speakerSectionMatch[1].trim() // e.g., "及川卓也 さん (@takoratta) / Tably株式会社 代表取締役"
        const speakerBioMarkdown = speakerSectionMatch[2].trim()

        let speakerName = speakerHeading
        let twitter_handle_from_heading: string | undefined
        let job_from_heading: string | undefined

        // Check if speakerHeading is a URL
        const isUrl =
          speakerHeading.startsWith('http://') ||
          speakerHeading.startsWith('https://')

        if (isUrl) {
          speakerName = 'TBA Speaker' // Assign a placeholder name
          // No X handle or job from heading if it's a URL
        } else {
          // Extract X handle from heading
          const xHandleInHeadingMatch = speakerHeading.match(/\(@(.+?)\)/)
          if (xHandleInHeadingMatch) {
            twitter_handle_from_heading = xHandleInHeadingMatch[1]
            speakerName = speakerName
              .replace(xHandleInHeadingMatch[0], '')
              .trim() // Remove X handle from name
          }

          // Extract job from heading (after X handle)
          const jobInHeadingMatch = speakerName.match(/\/\s*(.+)/)
          if (jobInHeadingMatch) {
            job_from_heading = jobInHeadingMatch[1].trim()
            speakerName = speakerName.replace(jobInHeadingMatch[0], '').trim() // Remove job from name
          }

          speakerName = speakerName.replace(/さん$/, '').trim() // Remove "さん" if present
        }

        const speakerBioLines = speakerBioMarkdown
          .split('\n')
          .filter(
            (line) =>
              !line.startsWith('![](') && !line.startsWith('#### metadata')
          )
        const speakerBioText = speakerBioLines.join('\n').trim()
        // const speakerBioHtml = await markdownToHtml(speakerBioText); // Not used in SpeakerSchema

        const photoUrlMatch = speakerBioMarkdown.match(/!\[\]\((.+?)\)/)
        const photo_url = photoUrlMatch ? photoUrlMatch[1] : undefined

        const metadataMatch = speakerBioMarkdown.match(
          /#### metadata\n([\s\S]+)/
        )
        let job_from_metadata = ''
        let twitter_handle_from_metadata: string | undefined

        if (metadataMatch) {
          const metadataLines = metadataMatch[1]
            .split('\n')
            .filter((line) => line.startsWith('- '))
          for (const line of metadataLines) {
            const [key, value] = line
              .substring(2)
              .split(':')
              .map((s) => s.trim())
            if (key === 'job') job_from_metadata = value
            if (key === 'twitter_handle') twitter_handle_from_metadata = value
          }
        }

        // Prioritize metadata values, then heading values
        const final_job = job_from_metadata || job_from_heading || ''
        const final_twitter_handle =
          twitter_handle_from_metadata || twitter_handle_from_heading || ''

        const speakerId = generateSpeakerId(final_twitter_handle, speakerName)
        speaker_ids.push(speakerId)

        const existingSpeaker = speakers.find((s) => s.id === speakerId)
        if (!existingSpeaker) {
          const speakerData = {
            id: speakerId,
            name: speakerName,
            bio: speakerBioText,
            photo_url: photo_url,
            job: final_job,
            twitter_handle: final_twitter_handle,
          }
          const parsedSpeaker = SpeakerSchema.safeParse(speakerData)
          if (!parsedSpeaker.success) {
            console.error(
              `Validation error for speaker ${speakerId}:`,
              parsedSpeaker.error
            )
            process.exit(1)
          }
          speakers.push(parsedSpeaker.data)
        }
      }

      const talkData = {
        id: talkId,
        title: title,
        abstract: abstract,
        time_start: frontmatter.time_start || '00:00',
        time_end: frontmatter.time_end || '00:00',
        track:
          frontmatter.track ||
          sessions.find((s) => s.id === sessionId)?.track ||
          'Unknown Track',
        speaker_ids: speaker_ids,
        tech_tags: frontmatter.tech_tags || [],
        level: Array.isArray(frontmatter.level)
          ? frontmatter.level
          : frontmatter.level
            ? [frontmatter.level]
            : [],
        perspective: Array.isArray(frontmatter.perspective)
          ? frontmatter.perspective
          : frontmatter.perspective
            ? [frontmatter.perspective]
            : [],
      }

      const parsedTalk = TalkSchema.safeParse(talkData)
      if (!parsedTalk.success) {
        console.error(`Validation error for talk ${talkId}:`, parsedTalk.error)
        process.exit(1)
      }
      talks.push(parsedTalk.data)

      // Update session with talk_ids
      const sessionIndex = sessions.findIndex((s) => s.id === sessionId)
      if (sessionIndex !== -1) {
        sessions[sessionIndex].talk_ids.push(talkId)
      }
    }
  }

  // Write output JSON files
  const outputDirPath = path.join(process.cwd(), 'src', 'data', 'prod')
  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, { recursive: true })
  }

  fs.writeFileSync(
    path.join(outputDirPath, 'sessions.json'),
    JSON.stringify(sessions, null, 2)
  )
  fs.writeFileSync(
    path.join(outputDirPath, 'talks.json'),
    JSON.stringify(talks, null, 2)
  )
  fs.writeFileSync(
    path.join(outputDirPath, 'speakers.json'),
    JSON.stringify(speakers, null, 2)
  )

  console.log('Content parsing complete and JSON files generated successfully.')
}

parseContent().catch(console.error)
