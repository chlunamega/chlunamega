<script>
import * as R from 'ramda'
import { getFiledRecordingsMedia } from '../../../helpers'
export default {
  methods: {
    getMedia: (currentContent, fileName) =>
      getFiledRecordingsMedia(
        R.pathOr('', ['attributes', 'slug'], currentContent),
        fileName
      ),
  },
}
</script>
<template lang="pug">
div
  the-menu
  single-a(
    apiCall='getFieldRecordings'
    contentName='fieldRecordings'
    pdfName='Documentation'
    pdfNamePlural='Documentation'
    :getMedia="getMedia"
  )  
</template>
