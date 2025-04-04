<template>
  <ion-page>
    <ion-content>
      <ion-list-header>Appareance</ion-list-header>
      <ion-list :inset="true">
        <ion-item>
          <ion-toggle :checked="paletteToggle" @ionChange="toggleChange($event)" justify="space-between">
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
  import { ref } from 'vue';

  const paletteToggle = ref(false);

  // Use matchMedia to check the user preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Add or remove the "ion-palette-dark" class on the html element
  const toggleDarkPalette = (shouldAdd: boolean) => {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  };

  // Check/uncheck the toggle and update the palette based on isDark
  const initializeDarkPalette = (isDark: boolean) => {
    paletteToggle.value = isDark;
    toggleDarkPalette(isDark);
  };

  // Initialize the dark palette based on the initial
  // value of the prefers-color-scheme media query
  initializeDarkPalette(prefersDark.matches);

  // Listen for changes to the prefers-color-scheme media query
  prefersDark.addEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));

  // Listen for the toggle check/uncheck to toggle the dark palette
  const toggleChange = (event: ToggleCustomEvent) => {
    toggleDarkPalette(event.detail.checked);
  };
</script>

<style>
  /* (Optional) This is added to prevent the flashing that happens when toggling between palettes */
  ion-item {
    --transition: none;
  }
</style>