import {mount} from '@vue/test-utils'
import App from '@/App.vue'
import i18n from "@/plugins/i18n";
import vuetify from "@/plugins/vuetify";
import {expect} from "vitest";

vi.mock('@/composables/useShoppingLists', () => {
  return {
    default: () =>({
      shoppingLists: [
        {
          name: 'first list',
        },
        {
          name: 'second list',
        }
      ],

      create: vi.fn(),
      remove: vi.fn(),
      save: vi.fn(),
    })
  }
})

function createWrapper(options) {
  return mount(App, {
    global: {
      plugins: [i18n, vuetify]
    },
    ...options
  })
}

it('should show all lists', () => {
  const wrapper = createWrapper()

  // assert output
  expect(wrapper.vm).toBeTruthy()
  expect(wrapper.text()).toContain('first list')
  expect(wrapper.text()).toContain('second list')
})
