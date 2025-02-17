<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useDate} from "vuetify";
import useShoppingLists from "@/composables/useShoppingLists";
import {nextTick, ref, toRaw} from "vue";

const {t} = useI18n()
const date = useDate()

const {create, save} = useShoppingLists()

const props = defineProps<{
  shoppingList: ShoppingList
}>()

const _shoppingList = ref<ShoppingList>(JSON.parse(JSON.stringify(props.shoppingList)))

const emit = defineEmits<{
  close: []
}>()

function newItem() {
  _shoppingList.value.items.push({
    name: '',
    quantity: 1,
    expirationDate: undefined,
    completed: false,
  })
}

function deleteItem(item: ShoppingListItem) {
  const index = _shoppingList.value.items.indexOf(item)
  _shoppingList.value.items.splice(index, 1)
}

async function handleSubmit() {
  _shoppingList.value.id ? save(_shoppingList.value) : create(_shoppingList.value);
  await nextTick()
  emit('close')

}
</script>

<template>
  <v-dialog
      :model-value="true"
      max-width="500"
      scrollable
      persistent
  >
    <form @submit.prevent="handleSubmit">
      <v-card>
        <v-toolbar density="compact">
          <v-toolbar-title>
            <v-text-field
                v-model="_shoppingList.name"
                :label="t('list-name')"
                hide-details
                required
                variant="plain"
            />
          </v-toolbar-title>


          <v-toolbar-items>
            <v-btn icon="mdi-close" size="small" @click="emit('close')"/>
          </v-toolbar-items>
        </v-toolbar>


        <v-card-text class="px-1 pb-0">
          <v-text-field
              v-for="(item, index) in _shoppingList.items" :key="index"
              v-model="item.name"
              :label="t('product-name')"
              required
              variant="outlined"
              density="compact"

          >
            <template #prepend>
              <v-text-field
                  v-model="item.quantity"
                  :label="t('quantity')"
                  hide-details
                  min="1"
                  type="number"
                  variant="outlined"
                  density="compact"
              />
            </template>

            <template #append>
              <v-btn-group density="compact">
                <v-btn
                    :color="item.expirationDate ? 'primary' : ''"
                    :icon="true"
                    :title="t('expiration-date')"
                >
                  <v-icon size="small">mdi-calendar</v-icon>

                  <v-menu activator="parent" :close-on-content-click="false">
                    <v-date-picker
                        :model-value="item.expirationDate ? date.date(item.expirationDate) : undefined"
                        :title="t('expiration-date')"
                        :header="t('select-date')"
                        @update:model-value="item.expirationDate = $event"
                    >
                      <template #actions>
                        <v-btn @click="item.expirationDate = undefined">
                          {{ t('clear') }}
                        </v-btn>
                      </template>
                    </v-date-picker>
                  </v-menu>
                </v-btn>

                <v-btn
                    :icon="true"
                    :title="t('product-remove')"
                    color="error"
                    @click="deleteItem(item)"
                >
                  <v-icon size="small">mdi-delete</v-icon>
                </v-btn>
              </v-btn-group>
            </template>
          </v-text-field>
        </v-card-text>

        <v-btn
            :title="t('product-next')"
            prepend-icon="mdi-plus"
            class="mx-auto mb-1"
            size="small"
            @click="newItem"
        >
          {{ t('product-next') }}
        </v-btn>

        <v-divider />

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="primary"
              :text="_shoppingList.id ? t('save') : t('create')"
              type="submit"
              prepend-icon="mdi-floppy"
          />
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<style scoped>
:deep(.v-input__append) {
  margin-inline-start: 8px !important
}

:deep(.v-input__prepend) {
  margin-inline-end: 8px !important
}
</style>
