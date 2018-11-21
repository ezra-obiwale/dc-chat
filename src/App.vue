<template>
  <div id="app">
    <basic-chat 
      title="Dev Center"
      :new-message="message">
      <div slot="input-container" class="input__container">
        <div class="input__field">
          <input
            type="text"
            name="message"
            aria-placeholder="Type message..."
            placeholder="Type message..."
            autofocus
            v-model="content"
            @keyup.enter.prevent="send"><br>
        </div>
        <div
          class="input__button"
          @click="send">
          Send
        </div>
      </div>
    </basic-chat>
    <p style="text-align: left">
      Start with <strong>/giphy</strong> to add a gif image
    </p>
  </div>
</template>

<script>
import BasicChat from 'basic-vue-chat'
import moment from 'moment'
import axios from 'axios'
import env from './env.js'

export default {
  name: 'app',
  data () {
    return {
      content: '/giphy laugh',
      lastId: 0,
      message: {}
    }
  },
  components: {
    BasicChat
  },
  methods: {
    send () {
      let content = this.content.trim()
      this.content = ''
      if (content.startsWith('/giphy')) {
        axios.get(`https://api.giphy.com/v1/gifs/translate?api_key=${env.API_KEY}&s=${content}&wierdness=${this.wierdness()}`)
          .then(resp => {
            this.updateMessage(resp.data.data.images.downsized_medium.url, true)

          })
          .catch(resp => {
            alert('something went wrong', resp)
          })
      } else {
        this.updateMessage(content)
      }
    },
    updateMessage (content, isImage) {
      this.$set(this, 'message', {
        id: 0,
        imageUrl: isImage ? content : '',
        contents: content,
        date: moment().format('H:m:s')
      })
    },
    wierdness () {
      return Math.round(Math.random(10) * 10)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
