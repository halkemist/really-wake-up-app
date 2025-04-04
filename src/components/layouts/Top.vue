<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button color="primary"></ion-menu-button>
      </ion-buttons>
      <ion-title>{{ $route.path }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="js">
  import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/vue';
</script>