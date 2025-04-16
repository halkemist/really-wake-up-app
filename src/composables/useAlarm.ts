import { ref, readonly } from "vue";
import { type Alarm } from "@/interfaces/main";
import { Storage } from "@ionic/storage";
import { useAlarmNotification } from "./useAlarmNotification";

const ALARMS_KEY = 'my-alarms';
const storage = new Storage();

const { scheduleAlarmNotification } = useAlarmNotification();

// State
const isInitialized = ref(false);
const alarms = ref<Alarm[]>([]);

// Init Storage
const init = async () => {
  if (isInitialized.value) return;

  await storage.create();
  await refreshAlarms();
  isInitialized.value = true;
};

// Helper method to refresh alarms from storage
const refreshAlarms = async () => {
  const storedAlarms = await storage.get(ALARMS_KEY) || [];
  alarms.value = [...storedAlarms];
  return alarms.value;
};

// CRUD Functions
const getAlarms = async (): Promise<Alarm[]> => {
  await init();

  console.log(alarms.value)

  return alarms.value;
};

const saveAlarm = async (alarm: Alarm): Promise<Alarm> => {
  await init();

  // Provide an ID
  if (!alarm.id) {
    alarm.id = Date.now();
  }

  // Prepare the data
  const cleanAlarm = {
    id: alarm.id,
    name: alarm.name,
    time: alarm.time,
    days: [...alarm.days],
    active: alarm.active,
    puzzleType: Number(alarm.puzzleType)
  };

  alarms.value.push(cleanAlarm);

  // Store in local storage
  await storage.set(ALARMS_KEY, JSON.parse(JSON.stringify(alarms.value)));

  // Prepare the alarm notification
  if (alarm.active) await scheduleAlarmNotification(alarm);
  
  return cleanAlarm;
};

const updateAlarm = async (alarm: Alarm): Promise<Alarm> => {
  await init();

  // Find the alarm index
  const index = alarms.value.findIndex(a => a.id === alarm.id);

  if (index !== -1) {
    // Find the alarm from the index
    alarms.value[index] = alarm;

    // Replace the alarm with the new data in the local storage
    await storage.set(ALARMS_KEY, JSON.parse(JSON.stringify(alarms.value)));

    // Prepare the alarm notification
    if (alarm.active) await scheduleAlarmNotification(alarm);

    return alarm;
  }

  throw new Error (`Alarm ${alarm.id} not found`);
};

const deleteAlarm = async (id: number): Promise<void> => {
  await init();

  alarms.value = alarms.value.filter(a => a.id !== id);
  await storage.set(ALARMS_KEY, JSON.parse(JSON.stringify(alarms.value)));
};

// Other functions
const getAlarmById = async (id: number): Promise<Alarm | undefined> => {
  await init();

  return alarms.value.find(a => a.id === id);
};

const toggleAlarmStatus = async (id: number): Promise<Alarm> => {
  await init();
  
  const index = alarms.value.findIndex(a => a.id === id);
  
  if (index !== -1) {
    alarms.value[index].active = !alarms.value[index].active;
    await storage.set(ALARMS_KEY, JSON.parse(JSON.stringify(alarms.value)));
    return alarms.value[index];
  }
  
  throw new Error(`Alarm ${id} not found`);
};

export function useAlarms() {
  return {
    alarms: readonly(alarms),

    getAlarms,
    saveAlarm,
    updateAlarm,
    deleteAlarm,
    getAlarmById,
    toggleAlarmStatus,

    refreshAlarms
  };
};
  