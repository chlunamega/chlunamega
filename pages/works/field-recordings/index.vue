<script>
import { mapState } from 'vuex'
import * as R from 'ramda'

export default {
  async fetch() {
    await Promise.all([
      this.$store.dispatch('getFieldRecordings'),
      this.$store.dispatch('getWorksConfig'),
      // this.$store.dispatch('getFieldRecordingsArchiveConfig')
    ])
  },
  fetchOnServer: true,
  computed: {
    ...mapState([
      'fieldRecordings',
      'worksConfig',
      'compositionsArchiveConfig',
    ]),
    recordingsByCategory() {
      return R.pipe(
        R.groupBy(R.path(['attributes', 'category'])),
        R.map(
          R.sort((a, b) =>
            this.attr('creation_date', a) > this.attr('creation_date', b)
              ? -1
              : 1
          )
        )
      )(this.fieldRecordings)
    },

    sortedCategories() {
      const cats = R.keys(this.recordingsByCategory)
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
      const img = R.path(['field_recording_banner'], this.worksConfig)
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
    h1.ttl Field Recordings
    .category(v-for='cat in sortedCategories' v-if='recordingsByCategory[cat]')
      h2.cat-title {{cat}}
      div.composition(v-for='rec in recordingsByCategory[cat]')
        router-link(:to='"/works/field-recordings/"+attr("slug", rec)')
          h3.rec-title {{attr('title', rec)}}
            span.rec-span(v-if="attr('year', rec)")  ({{attr('year', rec)}})
            span.rec-span(v-if="attr('place', rec)")   {{attr('place', rec)}},
            span.rec-span(v-if="attr('duration', rec)")  {{attr('duration', rec)}}
        p.attribute {{attr('description', rec)}}
</template>

<style lang="scss" scoped>
.category {
  margin-bottom: 30px;
}

.composition {
  padding-left: 20px;
  margin-bottom: 40px;
}
.rec-title {
  margin-bottom: 5px;
}

.rec-span {
  font-weight: normal;
  font-size: 16px;
}

.attribute {
  margin-bottom: 5px;
}
</style>
