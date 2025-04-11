<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/alarms"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ $t('layouts.addAlarmsTitle') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <ion-label position="floating">Alarm name</ion-label>
          <ion-input v-model="alarm.name" required></ion-input>
        </ion-item>
        
        <ion-item>
          <ion-label>Hour</ion-label>
          <ion-datetime
            v-model="timeValue"
            presentation="time"
            hourCycle="h23"
            @ionChange="updateTime"
          ></ion-datetime>
        </ion-item>
        
        <ion-list-header>
          <ion-label>Days</ion-label>
        </ion-list-header>
        
        <ion-item v-for="(day, index) in days" :key="index">
          <ion-label>{{ day }}</ion-label>
          <ion-checkbox 
            :checked="alarm.days.includes(index)" 
            @ionChange="toggleDay(index)"
          ></ion-checkbox>
        </ion-item>
        
        <ion-item>
          <ion-label>Active</ion-label>
          <ion-toggle v-model="alarm.active"></ion-toggle>
        </ion-item>
        
        <ion-item>
          <ion-label>Puzzle Type</ion-label>
          <ion-select v-model="alarm.puzzleType" interface="action-sheet">
            <ion-select-option value="0">Write the sentence</ion-select-option>
            <ion-select-option value="1">Calc</ion-select-option>
          </ion-select>
        </ion-item>
        
        <div class="ion-padding">
          <ion-button type="submit" expand="block">
            Register alarm
          </ion-button>
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonLabel,
    IonListHeader,
    IonDatetime,
    IonInput,
    IonButtons,
    IonTitle,
    IonBackButton,
    IonCheckbox,
    IonToggle,
    IonContent,
    useIonRouter
  } from '@ionic/vue';
  import { Alarm } from '@/interfaces/main';
  import { ref } from 'vue';
  import { useAlarms } from '@/composables/useAlarm';

  const ionRouter = useIonRouter();
  const { addAlarm } = useAlarms();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Alarm object with default values
  const alarm = ref<Alarm>({
    id: Date.now(),
    name: '',
    time: '08:00',
    days: [],
    active: true,
    puzzleType: 0
  });
  const timeValue = ref<string | null>(null);

  const handleSubmit = async () => {
    try {
      // Check selected days
      if (alarm.value.days.length === 0) {
        alert("Please select at least one day");
        return;
      }

      // Check name
      if (!alarm.value.name.trim()) {
        alert("Please write a name");
        return;
      }

      // Register the new alarm
      await addAlarm(alarm.value);

      // Redirect to alarm list
      ionRouter.back();
    } catch (error) {
      console.error('Error during alarm registering', error);
    }
  };

  // Add or delete a day from the list
  const toggleDay = (dayIndex: number) => {
    const currentDays = [...alarm.value.days];

    if (currentDays.includes(dayIndex)) {  
      // Delete is already selected
      alarm.value.days = currentDays.filter(day => day !== dayIndex);
    } else {
      // Add the day
      alarm.value.days = [...currentDays, dayIndex].sort();
    }
  };

  // Update selected time
  const updateTime = (event: CustomEvent) => {
    const date = new Date(event.detail.value);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    alarm.value.time = `${hours}:${minutes}`;
  };
</script>