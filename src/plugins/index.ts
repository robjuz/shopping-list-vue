/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from '@/plugins/vuetify'
import i18n from "@/plugins/i18n";

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
      .use(vuetify)
      .use(i18n)
}
