<script>
import * as R from 'ramda'
import log from 'tap-logger' //eslint-disable-line
import { mapState } from 'vuex'
import { getHomeMedia } from '../helpers'

export default {
  name: 'home',
  computed: {
    ...mapState(['homeConfig']),
    img() {
      const img = R.pipe(R.pathOr([], ['homeConfig', 'images']), (imgs) => {
        const index = parseInt(Math.random() * imgs.length)
        return imgs[index]
      })(this)
      return img
    },
  },
  mounted() {
    this.$store.dispatch('getHomeConfig')
  },
  methods: {
    getHomeMedia,
  },
}
</script>

<template lang="pug">
div
  the-menu
  #home.home
    .home-images(v-if="img")
      img(:src="getHomeMedia(img)")
</template>

<style lang="scss" scoped>
.home {
  height: calc(100vh - 81px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.home-images {
  position: relative;
  top: -40px;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
}
</style>
