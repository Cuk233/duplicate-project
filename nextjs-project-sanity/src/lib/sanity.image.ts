import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const imageBuilder = createImageUrlBuilder({
  projectId: '5vwngzfs',
  dataset: 'production',
})

export const urlForImage = (source: SanityImageSource | null) => {
  // Return null if the source is falsy
  if (!source) {
    return null
  }

  // Handle both string and object types
  if (typeof source === 'string') {
    return imageBuilder?.image(source).auto('format').fit('max')
  }

  // Check for asset reference in object type
  if ('asset' in source && source.asset?._ref) {
    return imageBuilder?.image(source).auto('format').fit('max')
  }

  return null
} 