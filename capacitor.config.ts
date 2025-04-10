import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'really.wake.up',
  appName: 'really-wake-up',
  webDir: 'dist',
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_alarm",
      iconColor: "#FF0000",
      sound: "alarm.wav"
    },
    BackgroundRunner: {
      label: "Alarm Service",
      src: "runners/background.js",
      event: "alarm",
      autoStart: true
    }
  }
};

export default config;
