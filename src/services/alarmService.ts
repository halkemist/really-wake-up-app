import { Alarm } from "@/interfaces/main";
import { Storage } from "@ionic/storage";

const ALARMS_KEY = 'my-alarms';
const storage = new Storage();

storage.create();

export default {
  async getAlarms(): Promise<Alarm[]> {
    const alarms = await storage.get(ALARMS_KEY);
    return alarms || [];
  },

  async addAlarm(alarm: Alarm): Promise<Alarm> {
    const alarms = await this.getAlarms();

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
  },

  async updateAlarm(alarm: Alarm): Promise<Alarm> {
    const alarms = await this.getAlarms();
    const index = alarms.findIndex(a => a.id === alarm.id);

    if (index !== -1) {
      alarms[index] = alarm;
      await storage.set(ALARMS_KEY, alarms);
      return alarm;
    }

    throw new Error (`Alarm ${alarm.id} not found`);
  },

  async deleteAlarm(id: number): Promise<void> {
    const alarms = await this.getAlarms();
    const updateAlarms = alarms.filter(a => a.id !== id);
    await storage.set(ALARMS_KEY, updateAlarms);
  },

  async getAlarmById(id: number): Promise<Alarm | undefined> {
    const alarms = await this.getAlarms();
    return alarms.find(a => a.id === id);
  },
  
  async toggleAlarm(id: number): Promise<Alarm> {
    const alarms = await this.getAlarms();
    const index = alarms.findIndex(a => a.id === id);
    
    if (index !== -1) {
      alarms[index].active = !alarms[index].active;
      await storage.set(ALARMS_KEY, alarms);
      return alarms[index];
    }
    
    throw new Error(`Alarm ${id} not found`);
  }
}