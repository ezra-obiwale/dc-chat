import { mount, createLocalVue } from '@vue/test-utils'
import Chat from '@/views/Chat.vue'
import router from '@/router'
import store from '@/store'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Chat page', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Chat, {
      localVue,
      router,
      store
    })
    wrapper.vm.setUsername('alex')
  })

  it('should have username as alex', () => {
    expect(wrapper.vm.username).toBe('alex')
  })

  it('should have no messages', () => {
    expect(wrapper.vm.messages).toHaveLength(0)
  })

})
