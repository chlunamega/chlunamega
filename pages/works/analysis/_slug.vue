<script>
import * as R from 'ramda'
import { getAnalysisMedia } from '../../../helpers'
export default {
  methods: {
    getMedia: (currentContent, fileName) =>
      getAnalysisMedia(
        R.pathOr('', ['attributes', 'slug'], currentContent),
        fileName
      ),
  },
}
</script>
<template lang="pug">
div
  the-menu
  single-a(apiCall="getAnalysis"
           contentName='analysis'
           indexPath="https://christopherlunamega.com/analysis"
           pdfName='Analysis'
           pdfNamePlural='Analysis'
           :getMedia="getMedia")  
</template>
