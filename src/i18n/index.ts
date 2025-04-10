import { createI18n } from "vue-i18n";
import en from './locales/en.json';
import fr from './locales/fr.json';
import { Storage } from "@ionic/storage";
import { type MessageSchema, type AvailableLocales } from "@/interfaces/main";

const LANGUAGE_KEY = 'app-language';

const storage = new Storage();

const messages = {
  en,
  fr
} as const;

export const i18n = createI18n<[MessageSchema], AvailableLocales>({
  legacy: true,
  locale: 'en' as AvailableLocales,
  fallbackLocale: 'en' as AvailableLocales,
  messages: messages
});

export const setupI18n = async () => {
  await storage.create();
  
  const getDeviceLanguage = (): AvailableLocales => {
    const language = window.navigator.language.split('-')[0];
    return (Object.keys(messages).includes(language) 
      ? language 
      : 'en') as AvailableLocales;
  };
  
  // Get lang from system or from storage
  const savedLanguage = await storage.get(LANGUAGE_KEY) as AvailableLocales | null;
  const initialLanguage = savedLanguage || getDeviceLanguage();
  
  setLanguage(initialLanguage);
  
  return i18n;
};

export const setLanguage = async (locale: AvailableLocales) => {
  i18n.global.locale = locale;
  await storage.set(LANGUAGE_KEY, locale);
};

export const getCurrentLanguage = (): AvailableLocales => {
  return i18n.global.locale;
};

export const getAvailableLanguages = () => {
  return Object.keys(messages).map(key => ({
    code: key as AvailableLocales,
    name: key === 'en' ? 'English' : 'Français'
  }));
};