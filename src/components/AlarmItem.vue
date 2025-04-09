<template>
  <ion-item-sliding v-if="props.item">
    <ion-item @click="editAlarm(props.item.id)">
      <ion-label>
        <h2>{{ props.item.time }}</h2>
        <p>{{ props.item.name }}</p>
      </ion-label>
      <ion-chip v-for="(day, index) in weekDays" :key="index" :color="props.item.days.includes(day)  ? 'primary' : 'medium'">
        {{ formatDay(day) }}
      </ion-chip>
      <ion-icon :icon="getPuzzleIcon(props.item.puzzleType)" slot="start"></ion-icon>
      <ion-toggle v-model="props.item.active" @ionChange="toggleAlarm(props.item.id)" slot="end"></ion-toggle>
    </ion-item>
    <!-- Sliding End Part -->
    <ion-item-options side="end">
      <ion-item-option color="danger" @click="deleteAlarm(props.item.id)">
        <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>
<script setup lang="ts">
  import { alarm } from '@/interfaces/main';
  import {
    IonItemSliding,
    IonItem,
    IonLabel,
    IonChip,
    IonIcon,
    IonToggle,
    IonItemOptions,
    IonItemOption
  } from '@ionic/vue';
  import { trashOutline, clipboard } from 'ionicons/icons';

  const props = defineProps<{
    item?: alarm
  }>();

  const weekDays = [0, 1, 2, 3, 4, 5, 6];
  const beautifulWeekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const formatDay = (day: number): string => {
    return beautifulWeekDays[day];
  }
  const getPuzzleIcon = (puzzleType: number) => { return clipboard }
  const toggleAlarm = (id: number) => {}
  const editAlarm = (id: number) => {}
  const deleteAlarm = (id: number) => {}
</script>