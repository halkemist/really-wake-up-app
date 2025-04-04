<template>
  <ion-item>
    <div v-if="props.item">
      {{ props.item.name }} - {{ props.item.days }} - {{ props.item.active }}
    </div>
  </ion-item>
</template>
<script setup lang="ts">
  import {
    IonItem
  } from '@ionic/vue';

  const props = defineProps<{
    item?: {
      name: string,
      days: Array<number>,
      active: boolean
    }
  }>()
</script>