<template>
  <div class="U_panel">
    <input type="file" @change="handleFileChange">
    <a-button type="primary" @click="handleUpload">
      上传
    </a-button>
  </div>
</template>

<script>
  const SIZE = 10 * 1024 * 1024
  import http from '../utils/http'
  export default {
    data: () => ({
      container: {
        file: null
      },
      data: []
    }),
    methods: {
      request ({ url, method = "post", data, headers = {}, requestList }) {
        return new Promise(resolve => {
          const xhr = new XMLHttpRequest();
          xhr.open(method, url);
          Object.keys(headers).forEach(key =>
            xhr.setRequestHeader(key, headers[key])
          );
          xhr.send(data);
          xhr.onload = e => {
            resolve({
              data: e.target.response
            });
          };
        });
      },
      handleFileChange (e) {
        const [file] = e.target.files;
        if (!file) return;
        Object.assign(this.$data, this.$options.data());
        this.container.file = file;
      },
      async handleUpload () {
        if (!this.container.file) return
        const fileChunkList = this.createFileChunk(this.container.file)
        this.data = fileChunkList.map(({ file }, index) => ({
          chunk: file,
          // 生成文件切片时，需要给每个切片一个标识作为hash,后端合并的时候这是第几个切片
          hash: this.container.file.name + '----' + index
        }))
        await this.uploadChunk()
      },
      // 创建文件切片
      createFileChunk (file, size = SIZE) {
        const chunkList = []
        let cur = 0
        while (cur < file.size) {
          chunkList.push({
            file: file.slice(cur, cur + size)
          })
          cur += size
        }
        return chunkList
      },
      // 上传切片
      async uploadChunk () {

        const requestList = this.data
          .map(({ chunk, hash }) => {
            const formData = new FormData()
            formData.append('chunk', chunk)
            formData.append('hash', hash)
            formData.append('filename', this.container.file.name)
            return { formData }
          })
          .map(async ({ formData }) => {
            // debugger
            // return
            return this.request({
              url: 'http://localhost:8000/file',
              data: formData
            })
          })
        console.log(requestList)
        await Promise.all(requestList)
        this.mergeRequest()
      },
      // 合并切片
      mergeRequest () {
        this.request({
          url: "http://localhost:8000/merge",
          headers: {
            "content-type": "application/json"
          },
          data: JSON.stringify({
            filename: this.container.file.name
          })
        });
      }
    }
  }
</script>

<style scoped>
  .U_panel {
    width: 50%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid lightblue;
  }
</style>