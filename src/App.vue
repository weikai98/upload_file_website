<template>
  <div class="app">
    <Upload-File />
  </div>
</template>

<script>
  import UploadFile from './Upload_File.vue'
  import http from '../utils/http'
  export default {
    components: {
      'Upload-File': UploadFile
    },
    provide () {
      return {
        http: this.http
      }
    },
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  .app {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
</style>