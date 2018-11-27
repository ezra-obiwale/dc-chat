import { mount, createLocalVue } from '@vue/test-utils'
import { render } from '@vue/server-test-utils'
import Chat from '@/views/Chat.vue'
import router from '@/router'
import store from '@/store'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Chat page', () => {
  let wrapper, rendered, input

  beforeEach(() => {
    wrapper = mount(Chat, {
      localVue,
      router,
      store
    })
    rendered = render(Chat, {
      localVue,
      router,
      store
    })
    wrapper.vm.setUsername('alex')
    input = rendered.find('input')
  })

  it('should contain an input field', () => {
    expect(input.exists()).toBe(true)
  })

  it('should have username as alex', () => {
    expect(wrapper.vm.username).toBe('alex')
  })

  it('should have no messages', () => {
    expect(wrapper.vm.messages).toHaveLength(0)
  })

  // it('should increment messages when saveMessage is called', () => {
  //   wrapper.vm.saveMessage('First Message')
  //   expect(wrapper.vm.messages).toHaveLength(1)
  // })

  // it('should increment messages by one if message is set and send method is called', () => {
  //   wrapper.vm.message = 'Test'
  //   expect(wrapper.vm.message).toBe('Test')
  //   wrapper.vm.send()
  //   expect(wrapper.vm.messages).toHaveLength(1)
  // })

  // it('should clear username when logout is clicked', () => {
  //   wrapper.vm.logout()
  //   expect(wrapper.vm.username).toBe('')
  // })

})
