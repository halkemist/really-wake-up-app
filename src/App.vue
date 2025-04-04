<template>
  <ion-app>
    <ion-router-outlet id="main-content"></ion-router-outlet>
    <Tabs></Tabs>
  </ion-app>
</template>

<script setup lang="ts">
  import Tabs from '@/components/layouts/Tabs.vue';
  import {
    IonApp,
    IonRouterOutlet
  } from '@ionic/vue';
</script>

