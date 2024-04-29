<script setup lang="ts">
import { computed } from 'vue'
type ResultDialogProps = {
  open: boolean
  onContinue: () => void
  onCancel: () => void
  message: string
}
const props = defineProps<ResultDialogProps>()

// prevent props.open passing into v-model as it becomes modifiable
const isOpen = computed(() => props.open)
</script>

<template>
  <q-dialog v-model="isOpen" persistent fullwidth="true">
    <q-card style="width: 500px; font-size: 16px">
      <q-card-section class="row items-center">
        <q-avatar icon="done" color="positive" text-color="white" />
        <span class="q-ml-sm">{{ props.message }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="props.onCancel()" />
        <q-btn flat label="Play again" color="positive" @click="props.onContinue()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
