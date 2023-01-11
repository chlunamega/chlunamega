const seoBase = {
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
  { name: 'description', content: openGraphData.description },
  { property: 'og:url', content: openGraphData.url },
  { property: 'og:type', content: 'article' },
  { property: 'og:title', content: openGraphData.title },
  { property: 'og:description', content: openGraphData.description },
  { property: 'og:image', content: openGraphData.image.url },
  { property: 'og:image:width', content: openGraphData.image.width },
  { property: 'og:image:height', content: openGraphData.image.height },
]
