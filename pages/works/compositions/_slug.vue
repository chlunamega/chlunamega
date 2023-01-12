<script>
import { mapState } from 'vuex'
import * as R from 'ramda'
import { attr } from '~/helpers'
import { makeSingleHead } from '~/seo'

const ghMedia = (slug, media) =>
  `https://chlunamega.github.io/public/${slug}/${media}`

export default {
  name: 'CompositionsSingle',
  data() {
    return {
      quality: 'mp3', // 'aiff' || 'mp3'
    }
  },

  async fetch() {
    await this.$store.dispatch('getCompositions')
  },
  fetchOnServer: true,

  head() {
    return makeSingleHead(
      this,
      this.currentComposition,
      this.media(attr('image', this.currentComposition))
    )
  },

  computed: {
    ...mapState(['compositions']),
    slug() {
      return `compositions/${this.attr('slug', this.currentComposition)}`
    },
    mp3s() {
      return R.pipe(
        this.attr('mp3'),
        this.$SepartedStringIntoArr,
        R.map(
          R.pipe(R.split('_DESCRIPTION_'), ([mp3, description]) => ({
            mp3,
            description,
          }))
        )
      )(this.currentComposition)
    },
    pdfs() {
      return R.pipe(
        this.attr('pdf'),
        this.$SepartedStringIntoArr,
        R.map(
          R.pipe(R.split('_DESCRIPTION_'), ([pdf, description]) => ({
            pdf,
            description,
          }))
        )
      )(this.currentComposition)
    },
    currentComposition() {
      const slug = this.$route.params.slug
      console.log(
        R.find((c) => this.attr('slug', c) === slug, this.compositions)
      )
      return (
        R.find((c) => this.attr('slug', c) === slug, this.compositions) || {}
      )
    },
  },
  methods: {
    attr: R.curry((attr, obj) => R.path(['attributes', attr], obj)),
    media(media) {
      return ghMedia(this.slug, media)
    },
    pdf(currentComposition) {
      return ghMedia(this.slug, this.attr('pdf', currentComposition)) + '.pdf'
    },
    has(attr) {
      return R.path(['attributes', attr], this.currentComposition)
    },
    selectQuality(quality) {
      this.quality = quality
    },
  },
}
</script>

<template lang="pug">
div
  the-menu
  #single-composition.body-padding
    h1.title {{attr('title', currentComposition)}}
      p.subtitle {{attr('subtitle', currentComposition)}}

    img.main-image(v-if="has('image')"
      :src="media(attr('image', currentComposition))"
      )

    .body(v-html='currentComposition.body')

    .video(v-if="has('youtube')")
      iframe(width="560" height="315" :src='"https://www.youtube.com/embed/"+attr("youtube", currentComposition)' frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="")

    .audio(v-if="has('mp3') || has('aiff')") 
      div.audio-track(v-if="has('mp3') && quality === 'mp3'" v-for="mp3_ in mp3s")
        p.audio-description {{mp3_.description}}
        audio(controls :src="media(mp3_.mp3)")

    .score(v-if="has('pdf')") 
      p(v-if='pdfs.length === 1') View score:
      p(v-if='pdfs.length > 1') View scores:
        div(v-for='pdf in pdfs')
          a(target="_blank" :href='media(pdf.pdf)') {{pdf.description}}
</template>

<style lang="scss" scoped>
.selected {
  font-weight: bold;
}
.title {
  margin-bottom: 50px;
  text-align: center;
}
.subtitle {
  margin: 0;
  font-size: 16px;
}
.body {
  margin-bottom: 40px;
}
.main-image {
  margin-bottom: 40px;
  max-width: 700px;
  width: 100%;
  margin: 0 auto 60px;
  max-height: 500px;
  object-fit: contain;
}
.audio {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 40px;
  audio {
    width: 100%;
  }
}

.audio-track {
  margin-bottom: 20px;
}
.audio-description {
  font-weight: bold;
}

.quality {
  text-align: right;
  margin: 0;
  position: relative;
  span {
    padding: 0 5px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}

.score {
  font-size: 18px;
  text-align: center;
}

.video {
  text-align: center;
  margin-bottom: 40px;
}
</style>
