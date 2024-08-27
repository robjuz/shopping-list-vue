<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>
        {{ shoppingList.name }}
      </v-toolbar-title>

      <v-toolbar-items>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn @click.prevent icon="mdi-dots-vertical" variant="text" v-bind="props"/>
          </template>

          <v-list>
            <v-list-item
                prepend-icon="mdi-pen"
                base-color="primary"
                @click="emit('edit')"
            >
              {{ t('edit') }}
            </v-list-item>

            <v-list-item
                prepend-icon="mdi-delete"
                base-color="error"
                @click="remove(shoppingList)"
            >
              {{ t('delete') }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-list>
      <v-list-item v-for="shoppingListItem in shoppingList.items">
        <v-list-item-title :class="{'text-decoration-line-through': shoppingListItem.completed}">
          {{ [shoppingListItem.quantity, shoppingListItem.name].join(' &times; ') }}
        </v-list-item-title>

        <v-list-item-subtitle v-if="shoppingListItem.expirationDate">
          {{ date.format(shoppingListItem.expirationDate, 'fullDate') }}
        </v-list-item-subtitle>

        <template #prepend>
          <v-list-item-action start>
            <v-checkbox-btn v-model="shoppingListItem.completed" @input="save(shoppingList)"/>
          </v-list-item-action>
        </template>

        <template #append v-if="shoppingListItem.expirationDate">
          <v-list-item-action end v-if="date.isAfter(date.date(), date.date(shoppingListItem.expirationDate))">
            <v-btn :icon="true" color="error" density="compact">
              <v-icon>mdi-exclamation</v-icon>

              <v-tooltip activator="parent" location="top">
                {{ t('product-expired')}}
              </v-tooltip>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useDate} from "vuetify";
import useShoppingLists from "@/composables/useShoppingLists";

defineProps<{
  shoppingList: ShoppingList
}>()

const emit = defineEmits<{
  edit: []
}>()

const date = useDate()
const {t} = useI18n()
const {remove, save} = useShoppingLists()
</script>
