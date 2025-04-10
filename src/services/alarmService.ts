import { Alarm } from "@/interfaces/main";
import { Storage } from "@ionic/storage";

const ALARMS_KEY = 'my-alarms';
const storage = new Storage();

storage.create();

// CRUD Functions
const getAlarms = async (): Promise<Alarm[]> => {
  const alarms = await storage.get(ALARMS_KEY);
  return alarms || [];
};

const addAlarm = async (alarm: Alarm): Promise<Alarm> => {
  const alarms = await getAlarms();

  if (!alarm.id) {
    alarm.id = Date.now();
  }

  const cleanAlarm = {
    id: alarm.id,
    name: alarm.name,
    time: alarm.time,
    days: [...alarm.days],
    active: alarm.active,
    puzzleType: Number(alarm.puzzleType)
  };

  alarms.push(cleanAlarm);

  await storage.set(ALARMS_KEY, alarms);
  
  return alarm;
};

const updateAlarm = async (alarm: Alarm): Promise<Alarm> => {
  const alarms = await getAlarms();
  const index = alarms.findIndex(a => a.id === alarm.id);

  if (index !== -1) {
    alarms[index] = alarm;
    await storage.set(ALARMS_KEY, alarms);
    return alarm;
  }

  throw new Error (`Alarm ${alarm.id} not found`);
};

const deleteAlarm = async (id: number): Promise<void> => {
  const alarms = await getAlarms();
  const updateAlarms = alarms.filter(a => a.id !== id);
  await storage.set(ALARMS_KEY, updateAlarms);
};

// Other functions
const getAlarmById = async (id: number): Promise<Alarm | undefined> => {
  const alarms = await getAlarms();
  return alarms.find(a => a.id === id);
};
  
const toggleAlarm = async (id: number): Promise<Alarm> => {
  const alarms = await getAlarms();
  const index = alarms.findIndex(a => a.id === id);
  
  if (index !== -1) {
    alarms[index].active = !alarms[index].active;
    await storage.set(ALARMS_KEY, alarms);
    return alarms[index];
  }
  
  throw new Error(`Alarm ${id} not found`);
}

export default {
  getAlarms,
  updateAlarm,
  deleteAlarm,
  toggleAlarm,
  getAlarmById,
  addAlarm
};