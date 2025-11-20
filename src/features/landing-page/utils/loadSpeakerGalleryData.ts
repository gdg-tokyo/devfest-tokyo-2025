// src/features/landing-page/utils/loadSpeakerGalleryData.ts

import { Speaker, SessionChair } from '@/types'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(
  process.cwd(),
  'src',
  'data',
  process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
)

export async function loadSpeakerGalleryData() {
  try {
    const speakersFilePath = path.join(DATA_DIR, 'speakers.json')
    const sessionChairsFilePath = path.join(DATA_DIR, 'session-chairs.json')

    const speakersData = await fs.readFile(speakersFilePath, 'utf-8')
    const sessionChairsData = await fs.readFile(sessionChairsFilePath, 'utf-8')

    const speakers: Speaker[] = JSON.parse(speakersData)
    const sessionChairs: SessionChair[] = JSON.parse(sessionChairsData)

    return { speakers, sessionChairs }
  } catch (error) {
    console.error('Error loading speaker gallery data:', error)
    return { speakers: [], sessionChairs: [] }
  }
}
