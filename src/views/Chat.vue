<template>
    <div v-if="ready">
      <basic-chat
        ref="chat"
        :initial-feed="messages"
        :title="username">
        <div slot="input-container" class="input__container">
            <div class="input__field">
            <input
                type="text"
                name="message"
                aria-placeholder="Type message..."
                placeholder="Type message..."
                autofocus
                v-model="message"
                @keyup.enter.prevent="send"><br>
            </div>
            <div
            class="input__button"
            @click="send">
            Send
            </div>
        </div>
      </basic-chat>
      <p class="lead" style="text-align: left">
        Start with <strong>/giphy</strong> to add a gif image<br />
        <a href="#" class="btn btn-link" @click.prevent="logout" >Logout</a>
      </p>
    </div>
</template>

<script>
import BasicChat from 'basic-vue-chat'
import moment from 'moment'
import axios from 'axios'
import env from '../env.js'
import { mapState, mapGetters, mapMutations } from "vuex"

export default {
  name: 'app',
  data () {
    return {
      message: '/giphy laugh',
      lastId: 0,
      ready: false
    }
  },
  computed: {
    ...mapState(['username']),
    ...mapGetters(['messages'])
  },
  components: {
    BasicChat
  },
  created () {
    if (!this.username) {
      return this.$router.replace('/')
    }
    this.ready = true
  },
  methods: {
    ...mapMutations(['addMessage', 'setUsername']),
    logout () {
      this.setUsername('')
      this.$router.replace('/')
    },
    send () {
      let message = this.message.trim()
      if (!message) {
        return
      }
      this.message = ''
      if (message.startsWith('/giphy') && message.replace('/giphy', '').trim()) {
        axios.get(`https://api.giphy.com/v1/gifs/translate?api_key=${env.API_KEY}&s=${message}&wierdness=${this.wierdness()}`)
          .then(resp => {
            this.saveMessage(resp.data.data.images.downsized_medium.url, true)
          })
          .catch(resp => {
            console.log('something went wrong', resp)
          })
      } else {
        this.saveMessage(message)
      }
    },
    saveMessage (message, isImage) {
      this.addMessage({
        id: 0,
        imageUrl: isImage ? message : '',
        contents: message,
        date: moment().format('H:m:s')
      })
    },
    wierdness () {
      return Math.round(Math.random(10) * 10)
    }
  }
}
</script>

<style scoped>
.chat {
  width: 80vw;
}
</style>
