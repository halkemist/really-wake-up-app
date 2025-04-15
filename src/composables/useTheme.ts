import { Storage } from '@ionic/storage';
import { ref, readonly } from 'vue';

// State
const DARK_MODE_KEY = 'dark-mode-enabled';
const storage = new Storage();
const isDarkMode = ref(false);

// Init storage
const initStorage = async () => {
  await storage.create();
};

// Toggle theme mode
const toggleDarkPalette = (shouldAdd: boolean) => {
  document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  isDarkMode.value = shouldAdd;
};

const initializeTheme = async () => {
  await initStorage();
  
  // Get stored preferency
  const storedDarkMode = await storage.get(DARK_MODE_KEY);
  
  // Check system preferency
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Apply one of them
  if (storedDarkMode !== null) {
    toggleDarkPalette(storedDarkMode);
  } else {
    toggleDarkPalette(prefersDark.matches);
  }
  
  // Listen theme changing event
  prefersDark.addEventListener('change', async (mediaQuery) => {
    const stored = await storage.get(DARK_MODE_KEY);
    if (stored === null) {
      toggleDarkPalette(mediaQuery.matches);
    }
  });
};

const setDarkMode = async (enabled: boolean) => {
  toggleDarkPalette(enabled);
  await storage.set(DARK_MODE_KEY, enabled);
};

const toggleDarkMode = async () => {
  const newValue = !isDarkMode.value;
  await setDarkMode(newValue);
  return newValue;
};

export function useTheme() {
  return {
    isDarkMode: readonly(isDarkMode),
    
    initializeTheme,
    setDarkMode,
    toggleDarkMode
  };
};