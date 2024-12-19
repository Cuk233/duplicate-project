import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import ImageUrlBuilder from '@sanity/image-url/lib/types/builder'

const imageBuilder = createImageUrlBuilder({
  projectId: '5vwngzfs',
  dataset: 'production',
})

interface SanityAsset {
  _type: string;
  _id?: string;
  url?: string;
  _ref?: string;
  assetId?: string;
}

interface SanityImage {
  asset: SanityAsset;
  alt?: string;
}

export const urlForImage = (source: SanityImageSource | null): string | null => {
  // Return null if the source is falsy
  if (!source) {
    console.log('No source provided to urlForImage');
    return null;
  }

  // Log the source for debugging
  console.log('urlForImage source:', source);

  try {
    // If the source has a direct URL, use it
    if (typeof source === 'object' && 'asset' in source && (source as SanityImage).asset?.url) {
      const url = (source as SanityImage).asset.url;
      console.log('Using direct URL from asset:', url);
      return url || null;
    }

    // Handle both string and object types
    if (typeof source === 'string') {
      console.log('Processing string source');
      const url = imageBuilder.image(source).auto('format').fit('max').url();
      return url || null;
    }

    // Check for asset reference in object type
    if (typeof source === 'object' && 'asset' in source && (source as SanityImage).asset?._ref) {
      console.log('Processing asset reference:', (source as SanityImage).asset._ref);
      const url = imageBuilder
        .image(source)
        .auto('format')
        .fit('max')
        .width(800)
        .quality(80)
        .url();
      return url || null;
    }

    console.log('Invalid source format');
    return null;
  } catch (error) {
    console.error('Error in urlForImage:', error);
    return null;
  }
} 