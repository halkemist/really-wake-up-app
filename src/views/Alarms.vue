<template>
  <ion-page>
    <ion-content>
      <div>
        <h2>Alarms List</h2>
        <ion-buttons slot="start">
          <ion-button @click="addAlarm">+</ion-button>
        </ion-buttons>
      </div>
      <ion-list>
        <AlarmItem v-for="(alarm, index) in alarms" :item="alarm" :key="index"/>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import AlarmItem from '@/components/AlarmItem.vue';
  import { Alarm } from '@/interfaces/main';
  import alarmService from '@/services/alarmService';
  import { IonButtons, IonButton, IonContent, IonPage, IonList, useIonRouter, onIonViewDidEnter } from '@ionic/vue';
  import { ref } from 'vue';

  const ionRouter = useIonRouter();
  const alarms = ref<Alarm[]>([]);

  const addAlarm = () => {
    ionRouter.push('/alarms/add');
  };

  const loadAlarms = async () => {
    alarms.value = await alarmService.getAlarms();
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
