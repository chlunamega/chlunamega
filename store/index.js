import * as R from 'ramda'
import Vue from 'vue'
import Vuex from 'vuex'
// import log from 'tap-logger'
import api from '../api'
import { $SepartedStringIntoArr } from '../helpers'
Vue.use(Vuex)

const notEmpty = (x) => !R.isEmpty(x)

export default function createStore() {
  return new Vuex.Store({
    state: {
      about: {},
      newsConfig: {},
      worksConfig: {},
      homeConfig: {},
      compositions: [],
      compositionsArchiveConfig: [],
      news: [],
      fieldRecordings: [],
      analysis: [],
      improvisations: [],
      performances: [],
    },
    actions: {
      async getHomeConfig({ state, commit }) {
        if (notEmpty(state.homeConfig)) {
          return
        }
        await api
          .homeConfig(this.$axios)
          .then(R.pathOr({}, [0, 'attributes']))
          .then(
            R.evolve({
              images: $SepartedStringIntoArr,
            })
          )
          // .then(log)
          .then((homeConfig) => commit('setHomeConfig', homeConfig))
          .catch(console.error)
      },
      async getWorksConfig({ state, commit }) {
        if (notEmpty(state.worksConfig)) {
          return
        }
        await api
          .worksConfig(this.$axios)
          .then(R.pathOr({}, [0, 'attributes']))
          .then(
            R.evolve({
              images: $SepartedStringIntoArr,
            })
          )
          // .then(log)
          .then((worksConfig) => commit('setWorksConfig', worksConfig))
          .catch(console.error)
      },
      async getNewsConfig({ state, commit }) {
        if (notEmpty(state.newsConfig)) {
          return
        }
        await api
          .newsConfig(this.$axios)
          .then(R.pathOr({}, [0, 'attributes']))
          // .then(log)
          .then((config) => commit('setNewsConfig', config))
          .catch(console.error)
      },
      async getAbout({ state, commit }) {
        if (notEmpty(state.about)) {
          return
        }
        await api
          .about(this.$axios)
          .then(R.pathOr({}, [0]))
          // .then(log)
          .then((About) => commit('setAbout', About))
          .catch(console.error)
      },
      async getCompositions({ state, commit }) {
        if (notEmpty(state.compositions)) {
          return
        }
        console.log('GGGGGGGG')
        await api
          .compositions(this.$axios)
          .then((compositions) => commit('setCompositions', compositions))
          .catch(console.error)
      },
      async getNews({ state, commit }) {
        console.log('notEmpty(state.news) ', notEmpty(state.news))
        if (notEmpty(state.news)) {
          return
        }
        await api
          .news(this.$axios)
          .then((news) => commit('setNews', news))
          .catch(console.error)
      },
      async getFieldRecordings({ commit }) {
        if (notEmpty(state.fieldRecordings)) {
          return
        }
        await api
          .fieldRecordings(this.$axios)
          .then((fieldRecordings) => {
            return commit('setFieldRecordings', fieldRecordings)
          })
          .catch(console.error)
      },
      async getAnalysis({ state, commit }) {
        if (notEmpty(state.analysis)) {
          return
        }
        await api
          .analysis(this.$axios)
          // .then(log)
          .then((analysis) => commit('setAnalysis', analysis))
          .catch(console.error)
      },
      async getImprovisations({ state, commit }) {
        if (notEmpty(state.improvisations)) {
          return
        }
        await api
          .improvisations(this.$axios)
          // .then(log)
          .then((improvisations) => commit('setImprovisations', improvisations))
          .catch(console.error)
      },
      async getPerformances({ state, commit }) {
        if (notEmpty(state.peformances)) {
          return
        }
        await api
          .performances(this.$axios)
          // .then(log)
          .then((performances) => commit('setPerformances', performances))
          .catch(console.error)
      },
      async getCompositionsArchiveConfig({ state, commit }) {
        if (notEmpty(state.compositionsArchiveConfig)) {
          return
        }
        await api
          .compositionsArchiveConfig(this.$axios)
          .then((config) => {
            commit(
              'setCompositionsArchiveConfig',
              R.pathOr([], [0, 'attributes'], config)
            )
          })
          .catch(console.error)
      },
    },
    getters: {
      getContent: (state) => (contentName) => state[contentName],
    },
    mutations: {
      setHomeConfig(state, homeConfig) {
        state.homeConfig = homeConfig
      },
      setNewsConfig(state, newsConfig) {
        state.newsConfig = newsConfig
      },
      setWorksConfig(state, worksConfig) {
        state.worksConfig = worksConfig
      },
      setAbout(state, about) {
        state.about = about
      },
      setNews(state, news) {
        state.news = news
      },
      setImprovisations(state, improvisations) {
        state.improvisations = improvisations
      },
      setPerformances(state, performances) {
        state.performances = performances
      },
      setFieldRecordings(state, fieldRecordings) {
        state.fieldRecordings = fieldRecordings
      },
      setAnalysis(state, analysis) {
        state.analysis = analysis
      },
      setCompositions(state, compositions) {
        state.compositions = compositions
      },
      setCompositionsArchiveConfig(state, config) {
        state.compositionsArchiveConfig = config
      },
    },
  })
}
