<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="addAlarm">
            <ion-icon :icon="addCircleOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ $t('layouts.alarmsTitle') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <AlarmItem 
        v-for="(alarm, index) in alarms" 
        :item="alarm" 
        :key="index"
        @alarm-deleted="handleAlarmDeleted"
        />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import AlarmItem from '@/components/AlarmItem.vue';
  import { Alarm } from '@/interfaces/main';
  import { IonButtons, IonButton, IonContent, IonIcon, IonPage, IonList, IonHeader, IonToolbar, IonTitle, useIonRouter, onIonViewDidEnter } from '@ionic/vue';
  import { addCircleOutline } from 'ionicons/icons';
  import { ref } from 'vue';
  import { useAlarms } from '@/composables/useAlarm';

  const ionRouter = useIonRouter();
  const { getAlarms } = useAlarms();

  // State
  const alarms = ref<Alarm[]>([]);

  const addAlarm = () => {
    ionRouter.push('/alarms/add');
  };

  const loadAlarms = async () => {
    console.log('load alarms from vue')
    alarms.value = await getAlarms();
  };

  const handleAlarmDeleted = async () => {
    console.log('handle alarm deleted')
    await loadAlarms();
  };

  onIonViewDidEnter(loadAlarms);

</script>

  <style scoped>
  #container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  #container strong {
    font-size: 20px;
    line-height: 26px;
  }

  #container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
  }

  #container a {
    text-decoration: none;
  }
</style>
