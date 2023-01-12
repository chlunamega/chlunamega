<script>
import { mapState } from 'vuex'
import * as R from 'ramda'

export default {
  async fetch() {
    await Promise.all([
      this.$store.dispatch('getNews', this.$axios),
      this.$store.dispatch('getNewsConfig', this.$axios),
    ])
  },
  fetchOnServer: true,
  computed: {
    ...mapState(['news', 'newsConfig']),

    sortedNews() {
      return R.pipe(
        R.sort((a, b) =>
          a.attributes.published_date < b.attributes.published_date ? 1 : -1
        )
      )(this.news)
    },
    banner() {
      const img = R.path(['banner'], this.newsConfig)
      return img
        ? {
            'background-image': `url(${this.getNewsMedia2(img)})`,
          }
        : null
    },
  },
}
</script>

<template lang="pug">
div
  the-menu
  #news.body-padding
    div.banner(:style='banner')
    h1.ttl News
    .news-container(v-for='news in sortedNews')
      //- router-link(:to='"/news/"+news.slug')
      h2.news-title {{attr('title', news)}}
      div.news-data
        p.news-date {{attr('showable_date', news)}}
        p.news-location(v-if="attr('location', news)") @ {{attr('location', news)}} 
      //- router-link(:to='"/news/"+news.slug')
      img.news-image(:src='getNewsMedia(attr("slug", news), attr("image", news))')
      p(v-html='news.body')    
</template>

<style lang="scss" scoped>
.news-container {
  padding-left: 20px;
  margin-bottom: 40px;

  .news-title {
    margin-bottom: 5px;
  }
  p {
    margin-bottom: 5px;
  }

  .news-image {
    max-width: 350px;
    margin-bottom: 16px;
  }
  .news-data {
    display: flex;
    flex-wrap: wrap;
  }

  .news-date,
  .news-location {
    font-size: 16px;
    margin-bottom: 8px;
  }
  .news-location {
    padding-left: 5px;
  }
}
</style>
