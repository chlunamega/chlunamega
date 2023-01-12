<script>
import { mapState } from 'vuex'
import * as R from 'ramda'

export default {
  async fetch() {
    await this.$store.dispatch('getAnalysis')
    await this.$store.dispatch('getCompositionsArchiveConfig')
    await this.$store.dispatch('getWorksConfig')
  },
  fetchOnServer: true,
  computed: {
    ...mapState(['analysis', 'worksConfig', 'compositionsArchiveConfig']),
    sortedAnalysis() {
      return R.pipe(
        R.groupBy(R.path(['attributes', 'category'])),
        R.map(
          R.sort((a, b) =>
            this.attr('creation_date', a) > this.attr('creation_date', b)
              ? -1
              : 1
          )
        )
      )(this.analysis)
    },

    sortedCategories() {
      const cats = R.keys(this.sortedAnalysis)
      const knownCats = R.pipe(
        R.propOr('', 'order'),
        this.$SepartedStringIntoArr
      )(this.compositionsArchiveConfig)
      const unknownCats = R.pipe(
        R.difference(cats),
        R.sort((a, b) => (a > b ? 1 : -1))
      )(knownCats)

      return knownCats.concat(unknownCats)
    },

    banner() {
      const img = R.path(['analysis_banner'], this.worksConfig)
      return img
        ? {
            'background-image': `url(${this.getWorksMedia(img)})`,
          }
        : null
    },
  },
  methods: {
    attr: (attr, obj) => R.path(['attributes', attr], obj),
  },
}
</script>

<template lang="pug">
div
  the-menu
  #compositions.body-padding
    div.banner(:style='banner')
    h1.ttl Analysis
    .category(v-for='cat in sortedCategories' v-if='sortedAnalysis[cat]')
      h2.cat-title {{cat}}
      div.analysis(v-for='analysis in sortedAnalysis[cat]')
        router-link(:to='"/works/analysis/"+attr("slug", analysis)')
          h3.analysis-title {{attr('title', analysis)}}
            span  ({{attr('year', analysis)}})
</template>

<style lang="scss" scoped>
.category {
  margin-bottom: 30px;
}

.analysis {
  padding-left: 20px;
  margin-bottom: 40px;
}
.analysis-title {
  margin-bottom: 5px;
  font-weight: normal;
}
.attribute {
  margin-bottom: 5px;
}
</style>
