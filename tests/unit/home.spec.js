import { shallowMount, createLocalVue } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import router from '@/router'
import store from '@/store'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Home page', () => {
  let wrapper, input, button

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      localVue,
      router,
      store
    })
    input = wrapper.find('input')
    button = wrapper.find('button')
  })

  it('should have an empty username field', () => {
    expect(input.element.value).toBe('')
  })

  it ('should set error message if no username is provided and the button is clicked', () => {
    button.trigger('click')
    expect(wrapper.vm.error).toBe('You must provide a username to continue')
  })

  it('should show error message when no username is provided and the button is clicked', () => {
    button.trigger('click')
    const errorElement = wrapper.find('small')
    expect(errorElement.exists()).toBe(true)
    expect(wrapper.find('small').text()).toMatch(wrapper.vm.error)
  })

  it('should update the store with the inputed username', () => {
    input.setValue('alex')
    expect(wrapper.vm.username).toBe('alex')
  })

  it('should not display any error if username is provided and the button is clicked', () => {
    input.setValue('alex')
    button.trigger('click')

    const errorElement = wrapper.find('small')
    expect(errorElement.exists()).toBe(false)
  })
})
