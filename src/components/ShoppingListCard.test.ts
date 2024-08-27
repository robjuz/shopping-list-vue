import {mount} from '@vue/test-utils'
import ShoppingListCard from '@/components/ShoppingListCard.vue'
import i18n from "@/plugins/i18n";
import vuetify from "@/plugins/vuetify";
import {expect} from "vitest";

function createWrapper(options) {
  return mount(ShoppingListCard, {
    global: {
      plugins: [i18n, vuetify]
    },
    ...options
  })
}

it('should show list name', () => {
  const shoppingList: ShoppingList = {
    name: "test list",
  }
  const wrapper = createWrapper({
      props: {
        shoppingList
      }
    }
  )

  // assert output
  expect(wrapper.vm).toBeTruthy()
  expect(wrapper.text()).toContain('test list')
})

it('should show a product', () => {
  const shoppingList: ShoppingList = {
    name: "test list",
    items: [
      {
        name: 'first product'
      }
    ]
  }
  const wrapper = createWrapper({
      props: {
        shoppingList
      }
    }
  )

  expect(wrapper.vm).toBeTruthy()
  expect(wrapper.text()).toContain('first product')
})
