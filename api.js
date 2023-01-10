import * as R from 'ramda'

const base = 'https://chlunamega.github.io/data'

const get = (axios, json) => axios.get(`${base}/${json}`).then(R.path(['data']))

export default {
  homeConfig: (axios) => get(axios, `HomeConfig.json`),
  worksConfig: (axios) => get(axios, `WorksConfig.json`),
  about: (axios) => get(axios, `About.json`),
  news: (axios) => get(axios, `News.json`),
  newsConfig: (axios) => get(axios, `NewsConfig.json`),
  analysis: (axios) => get(axios, `Analysis.json`),
  fieldRecordings: (axios) => get(axios, `FieldRecordings.json`),
  improvisations: (axios) => get(axios, `Improvisation.json`),
  performances: (axios) => get(axios, `Performance.json`),
  compositions: (axios) => get(axios, `Compositions.json`),
  compositionsArchiveConfig: (axios) =>
    get(axios, `CompositionsArchiveConfig.json`),
}
