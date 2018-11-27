<template>
    <form @submit.prevent="gotoChat">
        <div class="form-group">
            <label>
                <p class="lead">Choose a username to start chatting</p>
            </label>
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">@</div>
                </div>
                <input type="text" class="form-control" v-model="theUsername" id="inlineFormInputGroupUsername2" placeholder="username">
                <div class="input-group-append">
                    <button class="btn btn-primary btn-md" @click="gotoChat">
                        <span class="d-none d-md-inline">Start chatting</span> &rarr;
                    </button>
                </div>
            </div>
            <small v-if="error" class="form-text text-danger">{{ error }}</small>
        </div>
    </form>
</template>
<script>
import { mapState, mapMutations } from "vuex"

export default {
    name: 'Home',
    data () {
        return {
            error: ''
        }
    },
    computed: {
        ...mapState(['username']),
        theUsername: {
            set (username) {
                this.setUsername(username)
            },
            get () {
                return this.username
            }
        }
    },
    methods: {
        ...mapMutations(['setUsername']),
        gotoChat () {
            this.error = ''
            if (!this.theUsername) {
                this.error = 'You must provide a username to continue'
                return
            }

            this.$router.push('/chat')
        }
    }
}
</script>
<style scoped>
button {
    margin-left: 10px;
}
</style>

