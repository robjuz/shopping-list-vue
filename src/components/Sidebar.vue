<template>
  <v-navigation-drawer
      v-model="show"
      location="right"
      width="350"
      disable-route-watcher
      temporary
      touchless
  >
    <v-toolbar :title="t('settings')" flat>
      <template #append>
        <v-btn
            icon="mdi-close"
            variant="flat"
            :title="t('settings-show')"
            @click="show = false"
        />
      </template>
    </v-toolbar>

    <v-divider/>

    <v-container class="px-3 py-3">
      <theme-options/>
    </v-container>

  </v-navigation-drawer>
</template>
<script setup>
import ThemeOptions from "@/components/ThemeOptions.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const show = defineModel({type: Boolean})
</script>
