<script>
import * as R from 'ramda'
import log from 'tap-logger' //eslint-disable-line
import { attr } from '~/helpers'
import { makeSingleHead } from '~/seo'

export default {
  name: 'SingleA',
  props: [
    'apiCall', // String
    'contentName', // String
    'indexPath', // String
    'getMedia',
    'pdfName', // String
    'pdfNamePlural', // String
  ],
  data() {
    return {
      quality: 'mp3', // 'aiff' || 'mp3'
    }
  },
  async fetch() {
    await this.$store.dispatch(this.apiCall)
  },
  fetchOnServer: true,
  head() {
    return makeSingleHead(
      this,
      this.currentContent,
      this.media(this.currentContent, attr('image', this.currentContent))
    )
  },
  computed: {
    content() {
      return this.$store.getters.getContent(this.contentName)
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
      )(this.currentContent)
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
      )(this.currentContent)
    },
    currentContent() {
      const slug = this.$route.params.slug
      return R.find((c) => this.attr('slug', c) === slug, this.content) || {}
    },

    imgWidth() {
      const maxWidth = this.attr('img_width', this.currentContent) || 700
      const maxWidth_ = maxWidth >= 700 ? 700 : maxWidth
      return {
        'max-width': maxWidth_ + 'px',
      }
    },
  },

  methods: {
    attr: R.curry((attr, obj) => R.path(['attributes', attr], obj)),
    media(currentContent, media) {
      return this.getMedia(currentContent, media)
    },
    pdf(currentContent) {
      const compo = currentContent
      return `/media/${this.attr('slug', compo)}/${this.attr('pdf', compo)}.pdf`
    },
    has(attr) {
      return R.path(['attributes', attr], this.currentContent)
    },
    selectQuality(quality) {
      this.quality = quality
    },
  },
}
</script>

<template lang="pug">
#single-content.body-padding
  h1.title {{attr('title', currentContent)}}
    p.subtitle {{attr('subtitle', currentContent)}}

  .image-container(:style='imgWidth')
    img(v-if="has('image')"
      :src="media(currentContent, attr('image', currentContent))"
      )

  .body(v-html='currentContent.body')

  .video(v-if="has('youtube')")
    iframe(width="560" height="315" :src='"https://www.youtube.com/embed/"+attr("youtube", currentContent)' frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="")

  .audio(v-if="has('mp3') || has('aiff')")
    p.quality quality:
      span(v-if="has('mp3')"
        :class="quality === 'mp3' ? 'selected' : ''"
        @click='selectQuality("mp3")'
      ) mp3
      span(v-if="has('aiff')"
        :class="quality === 'aiff' ? 'selected' : ''"
        @click='selectQuality("aiff")'
      ) aiff

    div.audio-track(v-if="has('mp3') && quality === 'mp3'" v-for="mp3_ in mp3s")
      p.audio-description {{mp3_.description}}
      audio(controls :src="media(currentContent, mp3_.mp3)")

    //- aiffs
    //- div.audio-track(v-if="has('aiff') && quality === 'aiff'")
    //-   p.audio-description {{mp3_.description}}
    //-   audio(controls :src="attr('aiff', currentContent)")

  .score(v-if="has('pdf')")
    p(v-if='pdfs.length === 1') View {{pdfName}}:
    p(v-if='pdfs.length > 1') View {{pdfNamePlural}}:
      div(v-for='pdf in pdfs')
        a(target="_blank" :href='media(currentContent, pdf.pdf)') {{pdf.description}}
</template>

<style lang="scss" scoped>
.selected {
  font-weight: bold;
}
.title {
  padding-top: 30px;
  margin-bottom: 50px;
  text-align: center;
}
.subtitle {
  margin: 0;
  font-size: 16px;
}

.body {
  margin-bottom: 80px;
  line-height: 1.4;
  max-width: 740px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;

  ::v-deep p {
    margin-bottom: 20px;
  }
}

.video {
  text-align: center;
  margin-bottom: 40px;
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

.image-container {
  max-width: 700px;
  width: 100%;
  margin: 0 auto 60px;
  max-height: 500px;
  img {
    object-fit: contain;
  }
}
</style>
