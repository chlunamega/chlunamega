<script>
import * as R from 'ramda'
// import log from 'tap-logger'
import { mapState } from 'vuex'
import { getWorksMedia } from '@/helpers'

export default {
  mounted() {
    this.$store.dispatch('getWorksConfig')
  },

  computed: {
    ...mapState(['worksConfig']),
    images() {
      return R.pipe(
        R.pick(['composition', 'field_recording', 'performance', 'analysis']),
        R.map(getWorksMedia),
        R.map((url) => ({ 'background-image': `url(${url})` }))
      )(this.worksConfig)
    },
  },
}
</script>

<template lang="pug">
div
  the-menu
  #works.body-padding
    .works-container
      nuxt-link.work(to='/works/compositions') 
        div.work-image(:style='images.composition')
        h2.works-ttl Compositions
      nuxt-link.work(to='/works/analysis')
        div.work-image(:style='images.analysis')
        h2.works-ttl Analysis
      nuxt-link.work(to='/works/field-recordings') 
        div.work-image(:style='images.field_recording')
        h2.works-ttl Field Recordings
      nuxt-link.work(to='/works/improvisation-performance') 
        div.work-image(:style='images.performance')
        h2.works-ttl Improvisation
</template>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';
.works-container {
  padding-top: 60px;
  max-width: 450px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @include under(750px) {
    justify-content: center;
  }
}

.work {
  padding: 10px;
}
.work-image {
  height: 200px;
  width: 200px;
  background-size: cover;
  background-position: center;
}

.works-ttl {
  font-size: 18px;
}
</style>
