import Vue from 'vue'
import {
  getAboutMedia,
  getHomeMedia,
  getWorksMedia,
  getNewsMedia2,
  getPublicMedia,
  getCompositionsMedia,
  getNewsMedia,
  getFiledRecordingsMedia,
  $SepartedStringIntoArr,
  attr,
} from '../helpers'
import log from 'tap-logger' //eslint-disable-line

if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({
    methods: {
      log,
      $SepartedStringIntoArr,
      getAboutMedia,
      getHomeMedia,
      getWorksMedia,
      getNewsMedia2,
      getPublicMedia,
      getCompositionsMedia,
      getNewsMedia,
      getFiledRecordingsMedia,
      attr,
    },
  })
}
