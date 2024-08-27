<template>
  <div>
    <div class="mb-3">
      <v-label :text="t('theme')" class="mb-2 font-weight-medium"/>

      <v-messages :messages="t('theme-message')" active/>
    </div>

    <v-radio-group
      v-model="userTheme"
      class="mb-2"
      color="primary"
      true-icon="mdi-check-circle-outline"
      hide-details
    >
      <v-radio
        v-for="(item, i) in items"
        :key="i"
        :value="item.value"
      >
        <template #label>
          <v-icon :icon="item.icon" start/>

          {{ item.text }}
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<script setup lang="ts">
import useSettings from '@/composables/useSettings'
import {useI18n} from "vue-i18n";
import {useTheme} from "vuetify";
import {ref, watch, watchEffect} from "vue";

const {t} = useI18n()
const theme = useTheme()

const {theme: userTheme} = useSettings()

let media: MediaQueryList

const systemTheme = ref('light')


watch(userTheme, val => {
  if (val === 'system') {
    media = getMatchMedia()!
    media.addEventListener('change', onThemeChange)
    onThemeChange()
  } else if (media) {
    media.removeEventListener('change', onThemeChange)
  }
}, {immediate: true})

function onThemeChange() {
  systemTheme.value = media!.matches ? 'dark' : 'light'
}

watchEffect(() => {
  theme.global.name.value = (
      userTheme.value === 'system' ? systemTheme.value : userTheme.value
  )
})

function getMatchMedia() {
  return window.matchMedia('(prefers-color-scheme: dark)')
}

const items = [
  {
    text: t('light'),
    icon: 'mdi-white-balance-sunny',
    value: 'light',
  },
  {
    text: t('dark'),
    icon: 'mdi-weather-night',
    value: 'dark',
  },
  {
    text: t('system'),
    icon: 'mdi-desktop-tower-monitor',
    value: 'system',
  },
]
</script>
