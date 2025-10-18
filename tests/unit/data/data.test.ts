import speakersData from '@/data/prod/speakers.json'
import talksData from '@/data/prod/talks.json'
import sessionsData from '@/data/prod/sessions.json'

describe('Data Files Structure', () => {
  it('speakers.json should be an array of speaker objects', () => {
    expect(Array.isArray(speakersData)).toBe(true)
    // TODO: Update toHaveLength with the actual number of production speakers
    // expect(speakersData).toHaveLength(18)
    expect(speakersData[0]).toHaveProperty('id')
    expect(speakersData[0]).toHaveProperty('name')
    expect(speakersData[0]).toHaveProperty('photo_url') // Changed from icon_url
    expect(speakersData[0]).toHaveProperty('job')
    expect(speakersData[0]).toHaveProperty('bio')
    expect(speakersData[0]).toHaveProperty('twitter_handle')
  })

  it('talks.json should be an array of talk objects', () => {
    expect(Array.isArray(talksData)).toBe(true)
    talksData.forEach((talk: any) => {
      expect(talk).toHaveProperty('id')
      expect(talk).toHaveProperty('title')
      expect(talk).toHaveProperty('abstract')
      expect(talk).toHaveProperty('speaker_ids')
      expect(Array.isArray(talk.speaker_ids)).toBe(true)
      // Optional properties
      expect(talk).toHaveProperty('tech_tags')
      expect(Array.isArray(talk.tech_tags)).toBe(true)
      expect(talk).toHaveProperty('level')
      expect(talk).toHaveProperty('perspective')
    })
  })

  it('sessions.json should be an array of session objects', () => {
    expect(Array.isArray(sessionsData)).toBe(true)
    // TODO: Update toHaveLength with the actual number of production sessions
    // expect(sessionsData).toHaveLength(X)
    sessionsData.forEach((session: any) => {
      expect(session).toHaveProperty('id')
      expect(session).toHaveProperty('talk_ids')
      expect(Array.isArray(session.talk_ids)).toBe(true)
      expect(session).toHaveProperty('track')
      expect(session).toHaveProperty('time_start')
      expect(session).toHaveProperty('time_end')

      expect(session).toHaveProperty('title')
      expect(session).toHaveProperty('level')
      expect(Array.isArray(session.level)).toBe(true)
      expect(session).toHaveProperty('tech_tags')
      expect(Array.isArray(session.tech_tags)).toBe(true)
      expect(session).toHaveProperty('description')
    })
  })
})
