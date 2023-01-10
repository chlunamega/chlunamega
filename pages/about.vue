<script>
import { mapState } from 'vuex'
import { getAboutMedia } from '@/helpers'
export default {
  mounted() {
    this.$store.dispatch('getAbout')
  },
  computed: {
    ...mapState(['about']),
    image() {
      return getAboutMedia(this.attr('image', this.about))
    },
    cv() {
      return getAboutMedia(this.attr('cv', this.about))
    },
  },
}
</script>

<template lang="pug">
div
  the-menu
  #about.body-padding
    div(v-if='about.attributes')
      .img-container
        img(:src='image')
      a.button(target='_blank' :href='cv') Curriculum Vitae
      p.body(v-html='about.body')
      p.email Contact: 
        a(target='_blank' :href='"mailto:"+attr("email", about)') {{attr("email", about)}}
      a.social(target='_blank' :href='attr("soundcloud", about)').fa.fa-soundcloud
      a.social(target='_blank' :href='attr("youtube", about)').fa.fa-youtube
</template>

<style lang="scss" scoped>
@import '../scss/colors.scss';
.img-container {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}

.button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  width: 200px;
  padding: 20px;
  font-size: 16px;
  color: white;
  background-color: $main;
  text-align: center;
}
.email {
  padding-top: 20px;
  a {
    font-weight: normal;
  }
}
.social {
  cursor: pointer;
  &:hover {
    color: $main-light;
  }
  font-size: 30px;
  padding: 10px;
}
</style>
