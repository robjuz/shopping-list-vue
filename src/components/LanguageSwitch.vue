<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import useSettings, {Settings} from "@/composables/useSettings";

const { t, availableLocales, locale: currentLocale  } = useI18n()
const {lang} = useSettings()

currentLocale.value = lang.value

function changeLanguage(locale: Settings['lang']) {
  lang.value = locale
  currentLocale.value = locale
}
</script>

<template>
  <v-menu eager>
    <template #activator="{ props }">
      <v-btn
          icon="mdi-translate"
          v-bind="props"
          :title="t('language-change')"
      >
      </v-btn>
    </template>

    <v-list v-model="lang">

      <v-list-item
          v-for="locale in availableLocales"
          :key="locale"
          :active="currentLocale === availableLocales"
      >
        <v-btn variant="text" @click="changeLanguage(locale)">
          {{ t(`languages.${locale}`)}}
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
