import * as R from 'ramda'
import axios from 'axios'
import api from './api'

const getSlugs = (page) => (pageData) =>
  R.map((x) => `${page}/${R.path(['attributes', 'slug'], x)}`, pageData)

export default function generate() {
  return Promise.all([
    api.compositions(axios).then(getSlugs('works/compositions')),
    api.fieldRecordings(axios).then(getSlugs('works/field-recordings')),
    api.analysis(axios).then(getSlugs('works/analysis')),
  ]).then(R.flatten)
}
