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
  import { IonButtons, IonButton, IonContent, IonPage, IonList } from '@ionic/vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const addAlarm = () => {
    router.push('/alarms/add');
  };

  const alarms = [
    {
      id: 0,
      name: 'test1',
      time: '00:50',
      days: [0, 2, 4],
      active: true,
      puzzleType: 0
    },
    {
      id: 1,
      name: 'test5',
      time: '08:30',
      days: [6, 7],
      active: false,
      puzzleType: 0
    }
  ];
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
