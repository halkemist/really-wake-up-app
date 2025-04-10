<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('layouts.settingsTitle') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list :inset="true">
        <ion-item>
          <ion-toggle :checked="isDarkMode" @ionChange="toggleChange($event)" justify="space-between">
            {{ $t('settings.darkMode') }}
          </ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>{{ $t('settings.language') }}</ion-label>
          <ion-select v-model="selectedLanguage" @ionChange="changeLanguage($event)" slot="end">
            <ion-select-option v-for="lang in availableLanguages" :key="lang.code" :value="lang.code">
              {{ lang.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
  import {
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonToggle,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonSelect,
    IonSelectOption
  } from '@ionic/vue';
  import { type ToggleCustomEvent, type SelectCustomEvent } from '@ionic/vue';
  import { type AvailableLocales } from '@/interfaces/main';
  import { getAvailableLanguages, getCurrentLanguage, setLanguage } from '@/i18n';
  import { ref } from "vue";
  import themeService from '@/services/themeService';

  const isDarkMode = themeService.isDarkMode;

  const toggleChange = (event: ToggleCustomEvent) => {
    themeService.setDarkMode(event.detail.checked);
  };

  const availableLanguages = getAvailableLanguages();
  const selectedLanguage = ref(getCurrentLanguage());

  const changeLanguage = async (event: SelectCustomEvent) => {
    await setLanguage(event.detail.value as AvailableLocales);
  };
</script>

<style>
  /* (Optional) This is added to prevent the flashing that happens when toggling between palettes */
  ion-item {
    --transition: none;
  }
</style>