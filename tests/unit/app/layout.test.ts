import { metadata } from '@/app/layout'
import { SITE } from '@/lib/site'

describe('Root Layout Metadata', () => {
  it('should have the correct default title', () => {
    expect(metadata.title).toHaveProperty('default', SITE.defaultTitle)
  })

  it('should have the correct title template', () => {
    expect(metadata.title).toHaveProperty('template', `%s | ${SITE.name}`)
  })

  it('should have the correct default description', () => {
    expect(metadata.description).toBe(SITE.defaultDescription)
  })

  it('should have the correct metadataBase', () => {
    expect(metadata.metadataBase).toEqual(new URL(SITE.url))
  })
})
