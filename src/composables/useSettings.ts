import { useStorage } from '@vueuse/core'
import {ToRefs, toRefs} from "vue";

export type Settings = {
  theme: 'light' | 'dark' | 'system',
  lang: 'en-US' | 'de-DE',
}
export default function useSettings(): ToRefs<Settings> {
  const settings = useStorage<Settings>('settings', {theme: 'light', lang: 'de-DE'}, localStorage)
  return toRefs(settings.value)
}
