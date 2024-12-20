import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: 'production',
})

export const urlForImage = (source: Image | null): string => {
  if (!source) {
    return '';
  }
  
  return imageBuilder?.image(source).auto('format').fit('max').url() || '';
} 