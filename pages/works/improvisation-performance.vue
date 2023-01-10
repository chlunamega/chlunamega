<script>
import { mapState } from 'vuex'
import * as R from 'ramda'
import log from 'tap-logger'
import { getPublicMedia } from '../../helpers'

const getMedia = getPublicMedia('improvisation-performance')

export default {
  mounted() {
    this.$store.dispatch('getImprovisations')
    this.$store.dispatch('getPerformances')
    this.$store.dispatch('getCompositionsArchiveConfig')
    this.$store.dispatch('getWorksConfig')
  },

  methods: {
    getMedia,
    attr: (attr, obj) => R.path(['attributes', attr], obj),
  },

  computed: {
    ...mapState([
      'improvisations',
      'performances',
      'compositionsArchiveConfig',
      'worksConfig',
    ]),
    sortedData() {
      return R.pipe(
        (improvs, perfs) => {
          let improvs_ = R.map(
            R.assocPath(['attributes', 'category'], 'Improvisation'),
            improvs
          )
          let perfs_ = R.map(
            R.assocPath(['attributes', 'category'], 'Performance'),
            perfs
          )
          return R.concat(improvs_, perfs_)
        },
        R.groupBy(R.path(['attributes', 'category'])),
        R.map(
          R.sort((a, b) =>
            this.attr('creation_date', a) > this.attr('creation_date', b)
              ? -1
              : 1
          )
        )
      )(this.improvisations, this.performances)
    },

    sortedCategories() {
      let cats = R.keys(this.sortedAnalysis)
      let knownCats = R.pipe(
        R.propOr('', 'order'),
        this.$SepartedStringIntoArr
      )(this.compositionsArchiveConfig)
      let unknownCats = R.pipe(
        R.difference(cats),
        R.sort((a, b) => (a > b ? 1 : -1))
      )(knownCats)

      return knownCats.concat(unknownCats)
    },

    banner() {
      let img = R.path(['performance_banner'], this.worksConfig)
      return img
        ? {
            'background-image': `url(${this.getWorksMedia(img)})`,
          }
        : null
    },
  },
}
</script>

<template lang="pug">
mixin audio-and-link
  audio(controls 
    :src="getMedia(attr('slug', data), attr('mp3', data))"
    ) 
  div
    a.link(target="_blank" :href="attr('link', data)") {{attr('link_text', data)}}
div
  the-menu
  #improv-performance.body-padding
    div.banner(:style='banner')
    .category(v-if='sortedData["Improvisation"]')
      h2.cat-title Improvisation
      div.data(v-for='data in sortedData["Improvisation"]')
        h3.data-title {{attr('showable_date', data)}}
          span(v-if="attr('performers', data)")  | {{attr('performers', data)}}
          span(v-if="attr('place', data)")  | {{attr('place', data)}}
        +audio-and-link

    .category(v-if='sortedData["Performance"]')
      h2.cat-title Performance
      div.data(v-for='data in sortedData["Performance"]')
        h3.data-title {{attr('title', data)}}
          span(v-if="attr('composer', data)")  | {{attr('composer', data)}}
          span(v-if="attr('performers', data)")  | {{attr('performers', data)}}
        div(style='margin-bottom: 16px')
          span(v-if="attr('showable_date', data)") {{attr('showable_date', data)}}
          span(v-if="attr('place', data)")  | {{attr('place', data)}}
        +audio-and-link
      
</template>

<style lang="scss" scoped>
.category {
  margin-bottom: 30px;
}

.data {
  padding-left: 20px;
  margin-bottom: 40px;
}
.data-title {
  margin-bottom: 10px;
  font-weight: bold;
  span {
    font-weight: normal;
  }
}
.attribute {
  margin-bottom: 5px;
}

.link {
  display: block;
  margin-top: 5px;
  padding-left: 5px;
  font-weight: normal;
  text-decoration: underline;
  font-size: 14px;
}
</style>
