
import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
            path: 'chat',
            component: () => import('./views/Chat.vue')
        }
      ]
    }
  ]
})