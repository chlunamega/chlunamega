import * as R from 'ramda'
import generate from './static-site-generation'
generate()

export const $SepartedStringIntoArr = R.pipe(
  R.split('$'),
  R.reject(R.equals('')),
  R.map(R.trim)
)
const cdn = 'https://chlunamega.github.io/public'

export const getAboutMedia = (media) => `${cdn}/about/${media}`

export const getHomeMedia = (media) => `${cdn}/home/${media}`

export const getWorksMedia = (media) => `${cdn}/works/${media}`

export const getPublicMedia = (folder) => (slug, media) =>
  `${cdn}/${folder}/${slug}/${media}`

export const getCompositionsMedia = getPublicMedia('compositions')

export const getAnalysisMedia = getPublicMedia('analysis')

export const getFiledRecordingsMedia = getPublicMedia('field-recordings')

export const getNewsMedia = getPublicMedia('news')

export const getNewsMedia2 = (media) => `${cdn}/news/${media}`

export const attr = (attr, obj) => R.path(['attributes', attr], obj)
