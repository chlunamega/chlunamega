<script>
import { mapState } from 'vuex'
import * as R from 'ramda'

export default {
  name: 'Compositions',
  async fetch() {
    await Promise.all([
      this.$store.dispatch('getCompositions'),
      this.$store.dispatch('getCompositionsArchiveConfig'),
      this.$store.dispatch('getWorksConfig'),
    ])
  },
  fetchOnServer: true,
  computed: {
    ...mapState(['compositions', 'worksConfig', 'compositionsArchiveConfig']),
    sortedCompositions() {
      return R.sort(
        (a, b) =>
          this.attr('creation_date', a) > this.attr('creation_date', b)
            ? -1
            : 1,
        this.compositions
      )
    },

    banner() {
      const img = R.path(['composition_banner'], this.worksConfig)
      return img
        ? {
            'background-image': `url(${this.getWorksMedia(img)})`,
          }
        : null
    },
    methods: {
      attr: (attr, obj) => R.path(['attributes', attr], obj),
    },
  },
}
</script>

<template lang="pug">
div
  the-menu
  #compositions.body-padding
    div.banner(:style='banner')
    h1.ttl Compositions
    div.composition(v-for='compo in sortedCompositions')
      nuxt-link(:to='"/works/compositions/"+attr("slug", compo)')
        h3.compo-title {{attr('title', compo)}}
          span  ({{attr('year', compo)}})
      p.attribute {{attr('instrumentation', compo)}}
      img.compo-image(:src='getCompositionsMedia(attr("slug", compo), attr("image", compo))')
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
.compo-image {
  max-width: 350px;
  margin-bottom: 16px;
}
.attribute {
  margin-bottom: 5px;
}
</style>
