<template>
  <v-app>
    <sidebar v-model="showSidebar"/>

    <v-app-bar density="compact">
      <v-app-bar-title>
        {{ t('app-name') }}
      </v-app-bar-title>

      <v-spacer/>

      <language-switch />

      <v-btn icon="mdi-cog" @click="showSidebar = true"/>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-fab
          app
          color="primary"
          icon="mdi-plus"
          :title="t('list-new')"
          @click="newShoppingList"
        />

        <shopping-list-dialog
          v-if="shoppingList"
          :shopping-list="shoppingList"
          @close="shoppingList = null"
        />

        <v-row>
          <v-col
            v-for="list in shoppingLists"
            :key="list.name"
            cols
            sm="6"
            md="4"
            lg="3"
          >
            <shopping-list-card
              :shopping-list="list"
              @edit="shoppingList = list"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import LanguageSwitch from "@/components/LanguageSwitch.vue";
import Sidebar from "@/components/Sidebar.vue";

import {useI18n} from 'vue-i18n'
import {ref} from "vue";
import useShoppingLists from "@/composables/useShoppingLists";
import ShoppingListDialog from "@/components/ShoppingListDialog.vue";
import ShoppingListCard from "@/components/ShoppingListCard.vue";

const {shoppingLists}  = useShoppingLists()

const {t} = useI18n()
const showSidebar = ref(false)
const shoppingList = ref<ShoppingList>(null)

function newShoppingList() {
  shoppingList.value = {
    name: '',
    items: [
      {
        name: '',
        completed: false,
        quantity: 1
      }
    ]
  }
}
</script>
