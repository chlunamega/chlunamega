import { attr } from './helpers'

export const seoBase = {
  title: 'Christopher Luna Mega | Composer',
  description: 'Music Composer',
  image: {
    url: '/seo.jpeg',
    width: 1024,
    height: 768,
  },
}

const url = 'https://diegovdc.github.io/chlunamega'

export const openGraphData = {
  url,
  title: seoBase.title,
  description: seoBase.description,
  image: {
    url: url + seoBase.image.url,
    width: seoBase.image.width,
    height: seoBase.image.height,
  },
}

export const makeOpenGraphMeta = (openGraphData) => [
  {
    hid: 'description',
    name: 'description',
    content: openGraphData.description,
  },
  { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
  { hid: 'og:url', property: 'og:url', content: openGraphData.url },
  { hid: 'og:type', property: 'og:type', content: 'article' },
  { hid: 'og:title', property: 'og:title', content: openGraphData.title },
  {
    hid: 'og:description',
    property: 'og:description',
    content: openGraphData.description,
  },
  { hid: 'og:image', property: 'og:image', content: openGraphData.image.url },
  {
    hid: 'og:image:width',
    property: 'og:image:width',
    content: openGraphData.image.width,
  },
  {
    hid: 'og:image:height',
    property: 'og:image:height',
    content: openGraphData.image.height,
  },
]

export function makeSingleHead($this, currentContent, imageUrl) {
  const url = $this.indexPath
    ? `${$this.indexPath}/${$this.$route.params.slug}`
    : ''
  return {
    url,
    title: attr('title', currentContent),
    description: attr('seo_description', currentContent) || seoBase.description,
    meta: makeOpenGraphMeta({
      url,
      title: attr('title', currentContent),
      description:
        attr('seo_description', currentContent) || seoBase.description,
      image: {
        url: imageUrl || seoBase.image,
        width: attr('seo_image_width', currentContent) || seoBase.image.width,
        height:
          attr('seo_image_height', currentContent) || seoBase.image.height,
      },
    }),
  }
}
