// Background Runner service file: https://capacitorjs.com/docs/apis/background-runner

// Required permissions in AndroidManifest.xml:
// <uses-permission android:name="android.permission.VIBRATE" />
// <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
// <uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
// <uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" />
// <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
// <uses-permission android:name="android.permission.WAKE_LOCK" />

import { useAlarms } from "../composables/useAlarm";

const { getAlarms } = useAlarms();

// Function pour jouer son d'alarme en continu
const playAlarmSound = async () => {
  // Get alarm from storage
  const alarm = getActiveAlarm();

  if (alarm) {
    // Send notification
    await sendAlarmNotification(alarm);

    // Repeat the sound while active
    while (await isAlarmActive(alarm.id)) {
      await playSound();
      await sleep(1000);
    }
  }
};

const getActiveAlarm = async () => {
  // Get alarm from storage
  const alarms = await getAlarms();
  return alarms[0];
};

const sendAlarmNotification = async () => {
  // Send notification
};

const isAlarmActive = async (alarmId) => {
  // Check if alarm is still active or stopped
  return false;
};

const playSound = async () => {
  // play sound
};

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export default {
  playAlarmSound
};

