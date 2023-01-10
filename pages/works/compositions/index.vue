<script>
import { mapState } from 'vuex'
import * as R from 'ramda'
import { $SepartedStringIntoArr } from '../../../helpers'

export default {
  name: 'Compositions',
  computed: {
    ...mapState(['compositions', 'worksConfig', 'compositionsArchiveConfig']),
    composByCategory() {
      return R.pipe(
        R.groupBy(R.path(['attributes', 'category'])),
        R.map(
          R.sort((a, b) =>
            this.attr('creation_date', a) > this.attr('creation_date', b)
              ? -1
              : 1
          )
        )
      )(this.compositions)
    },

    sortedCategories() {
      const cats = R.keys(this.composByCategory)
      const knownCats = R.pipe(
        R.propOr('', 'order'),
        $SepartedStringIntoArr
      )(this.compositionsArchiveConfig)
      const unknownCats = R.pipe(
        R.difference(cats),
        R.sort((a, b) => (a > b ? 1 : -1))
      )(knownCats)

      return knownCats.concat(unknownCats)
    },

    banner() {
      const img = R.path(['composition_banner'], this.worksConfig)
      return img
        ? {
            'background-image': `url(${this.getWorksMedia(img)})`,
          }
        : null
    },
  },
  mounted() {
    this.$store.dispatch('getCompositions')
    this.$store.dispatch('getCompositionsArchiveConfig')
    this.$store.dispatch('getWorksConfig')
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
    h1.ttl Compositions
    .category(v-for='cat in sortedCategories' v-if='composByCategory[cat]')
      h2.cat-title {{cat}}
      div.composition(v-for='compo in composByCategory[cat]')
        nuxt-link(:to='"/works/compositions/"+attr("slug", compo)')
          h3.compo-title {{attr('title', compo)}}
            span  ({{attr('year', compo)}})
        p.attribute {{attr('instrumentation', compo)}}
        p.attribute {{attr('forces', compo)}}
        p.attribute(v-if="attr('premiere', compo)") Performances: {{attr('premiere', compo)}}
</template>

<style lang="scss" scoped>
.category {
  margin-bottom: 30px;
}

.composition {
  padding-left: 20px;
  margin-bottom: 40px;
}
.compo-title {
  margin-bottom: 5px;
}
.attribute {
  margin-bottom: 5px;
}
</style>
