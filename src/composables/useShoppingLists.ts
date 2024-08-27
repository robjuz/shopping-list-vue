import { useStorage } from '@vueuse/core'
export default function useShoppingLists() {
  const shoppingLists = useStorage<ShoppingList[]>('shopping-lists', [], localStorage)

  function create(list: ShoppingList) {
    list.id = (new Date).getTime()
    shoppingLists.value.push(list)
  }

  function save(list: ShoppingList) {
    const index = shoppingLists.value.findIndex(({id}) => id === list.id)

    if (index !== -1) {
      shoppingLists.value.splice(index, 1,  list)
    }
  }

  function remove(list: ShoppingList) {
    if (!list.id) return

    const index = shoppingLists.value.findIndex(({id}) => id === list.id)

    if (index === -1) return

    shoppingLists.value.splice(index, 1)
  }

  return {
    shoppingLists,
    create,
    remove,
    save
  }
}
