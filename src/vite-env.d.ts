/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ShoppingList {
  id?: string
  name: string
  items: Array<ShoppingListItem>
}

interface ShoppingListItem {
  name: string
  quantity: number
  expirationDate?: Date
  completed: boolean
}
