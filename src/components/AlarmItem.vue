<template>
  <ion-item-sliding v-if="props.item">
    <ion-item @click="editAlarm(props.item)">
      <ion-icon :icon="getPuzzleIcon(props.item.puzzleType)" slot="start"></ion-icon>
      <ion-label>
        <h2>{{ props.item.time }}</h2>
        <p>{{ props.item.name }}</p>
      </ion-label>
      <ion-chip v-for="(day, index) in weekDays" :key="index" :color="props.item.days.includes(day)  ? 'primary' : 'medium'">
        {{ formatDay(day) }}
      </ion-chip>
      <ion-toggle v-model="props.item.active" @ionChange="toggleAlarm(props.item.id)" slot="end"></ion-toggle>
    </ion-item>
    <!-- Sliding End Part -->
    <ion-item-options side="end">
      <ion-item-option color="danger" @click="removeAlarm(props.item.id)">
        <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>
<script setup lang="ts">
  import { Alarm } from '@/interfaces/main';
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
  import { trashOutline, clipboardOutline, calculatorOutline } from 'ionicons/icons';
  import { useAlarms } from '@/composables/useAlarm';

  const { deleteAlarm, toggleAlarmStatus, updateAlarm } = useAlarms();

  // State
  const props = defineProps<{
    item?: Alarm
  }>();
  const weekDays = [0, 1, 2, 3, 4, 5, 6];
  const beautifulWeekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Event
  const emit = defineEmits<{
    (e: 'alarmChange', id: number): void
  }>();

  // Functions
  const formatDay = (day: number): string => {
    return beautifulWeekDays[day];
  };
  const getPuzzleIcon = (puzzleType: number) => { 
    return Number(puzzleType) === 1 ? clipboardOutline : calculatorOutline;
  };

  const toggleAlarm = async (id: number) => {
    await toggleAlarmStatus(id);
    emit('alarmChange', id);

  };
  const editAlarm = async (alarm: Alarm) => {
    await updateAlarm(alarm);
    emit('alarmChange', alarm.id);
  };

  const removeAlarm = async (id: number) => {
    await deleteAlarm(id);
    emit('alarmChange', id);
  };
</script>