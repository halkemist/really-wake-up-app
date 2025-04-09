<template>
  <ion-page>
    <ion-content>
      <ion-list-header>Appareance</ion-list-header>
      <ion-list :inset="true">
        <ion-item>
          <ion-toggle :checked="isDarkMode" @ionChange="toggleChange($event)" justify="space-between">
            Dark Mode
          </ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
  import {
    IonPage,
    IonContent,
    IonListHeader,
    IonList,
    IonItem,
    IonToggle
  } from '@ionic/vue';
  import type { ToggleCustomEvent } from '@ionic/vue';
  import themeService from '@/services/themeService';

  const isDarkMode = themeService.isDarkMode;

  const toggleChange = (event: ToggleCustomEvent) => {
    themeService.setDarkMode(event.detail.checked);
  };
</script>

<style>
  /* (Optional) This is added to prevent the flashing that happens when toggling between palettes */
  ion-item {
    --transition: none;
  }
</style>