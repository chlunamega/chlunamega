<script>
import { mapActions, mapState } from 'vuex'
import * as R from 'ramda'
import log from 'tap-logger'

export default {
  name: 'CompositionsSingle',
  mounted() {
    this.$store.dispatch('getCompositions')
  },

  data() {
    return {
      quality: 'mp3', // 'aiff' || 'mp3'
    }
  },

  methods: {
    attr: R.curry((attr, obj) => R.path(['attributes', attr], obj)),
    media(media) {
      return this.ghMedia(this.slug, media)
    },
    pdf(currentComposition) {
      let compo = currentComposition
      return `/media/${this.attr('slug', compo)}/${this.attr('pdf', compo)}.pdf`
    },
    has(attr) {
      return R.path(['attributes', attr], this.currentComposition)
    },
    selectQuality(quality) {
      this.quality = quality
    },
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
      return (
        R.find((c) => this.attr('slug', c) === slug, this.compositions) || {}
      )
    },
  },
}
</script>

<template lang="pug">
#single-composition.body-padding
  h1.title {{attr('title', currentComposition)}}
    p.subtitle {{attr('subtitle', currentComposition)}}

  img(v-if="has('image')"
    :src="media(attr('image', currentComposition))"
    )

  .body(v-html='currentComposition.body')

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
      audio(controls :src="media(mp3_.mp3)")
    
    //- aiffs
    //- div.audio-track(v-if="has('aiff') && quality === 'aiff'")
    //-   p.audio-description {{mp3_.description}}
    //-   audio(controls :src="attr('aiff', currentComposition)")
    

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
</style>
