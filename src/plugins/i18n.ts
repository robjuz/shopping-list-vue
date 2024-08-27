import {createI18n, useI18n} from 'vue-i18n'

import enUS from '@/locales/en-US.json'
import deDE from '@/locales/de-DE.json'

export default createI18n<[MessageSchema], 'en-US' | 'de-DE'>({
  legacy: false,
  locale: 'de-DE',
  messages: {
    'en-US': enUS,
    'de-DE': deDE
  }
})
