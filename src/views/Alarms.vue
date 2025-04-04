<template>
  <ion-page>
    <ion-content>
      <div>
        <h2>Alarms List</h2>
        <ion-button expand="block" @click="addAlarm">Add alarm</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonButton, IonContent, IonPage } from '@ionic/vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const addAlarm = () => {
    router.push('/alarm/add');
  };
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
