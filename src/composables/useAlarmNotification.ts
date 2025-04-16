import { Alarm } from "@/interfaces/main";
import { LocalNotifications } from "@capacitor/local-notifications";

const initAlarmSystem = async () => { // TODO: initialize this method when the app is mounted
  const permResult = await LocalNotifications.requestPermissions();

  if (permResult.display !== 'granted') {
    // Fallback if user doesnt activate permissions
  }

  // Create the notification channel (android)
  await LocalNotifications.createChannel({
    id: 'alarm-channel',
    name: 'Alarms',
    description: 'Alarms Notifications',
    importance: 5,
    visibility: 1,
    sound: 'alarm.wav',
    vibration: true,
    lights: true,
    lightColor: '#FF0000'
  });

  // Notification Actions Config
  await LocalNotifications.registerActionTypes({
    types: [{
      id: 'ALARM_ACTIONS',
      actions: [{
        id: 'stop',
        title: 'Stop alarm',
      }, {
        id: 'snooze',
        title: 'Snooze (5 min)',
      }]
    }]
  });

  // Listen notification events
  LocalNotifications.addListener('localNotificationReceived', notification => onNotificationReceived(notification)); // TODO: create the onNotificationReceived method
  LocalNotifications.addListener('localNotificationActionPerformed', action => onNotificationAction(action)); // TODO: crate the onNotificationAction method
};

const scheduleAlarmNotification = async (alarm: Alarm) => {
  const alarmTime: Date = await getNextAlarmTime(alarm);

  await LocalNotifications.schedule({
    notifications: [{
      id: alarm.id,
      title: alarm.name || 'Wake Up',
      body: 'It\'s time to wake up!',
      sound: 'alarm.wav',
      schedule: {
        at: alarmTime
      },
      ongoing: true,
      autoCancel: false,
      channelId: 'alarm-channel',
      extra: {
        alarmId: alarm.id,
        puzzleType: alarm.puzzleType,
        alarmTime: alarm.time
      }
    }]
  });

  console.log(`Alarm scheduled for ${alarmTime.toLocaleString}`);
};

const getNextAlarmTime = async (alarm: Alarm): Promise<Date> => {
  const now = new Date();

  // Create a date object for the alarm time
  const [hours, minutes] = alarm.time.split(':').map(Number);
  const alarmTime = new Date();
  alarmTime.setHours(hours, minutes, 0, 0);

  if (alarmTime <= now || !alarm.days.includes(now.getDay())) {
    // Search the next valid day
    let daysToAdd =1;
    let nextDay = (now.getDay() + daysToAdd) % 7;

    // Continu until we found a valid day
    while (!alarm.days.includes(nextDay)) {
      daysToAdd++;
      nextDay = (now.getDay() + daysToAdd) % 7;
    }

    // Add the days number to complete to the next alarm
    alarmTime.setDate(now.getDate() + daysToAdd);
  }

  return alarmTime;
};

export function useAlarmNotification() {
  return {
    scheduleAlarmNotification
  };
};