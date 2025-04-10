import en from '../i18n/locales/en.json';

export interface Alarm {
  id: number,
  name: string,
  time: string, // HH:mm (24h)
  days: Array<number>,
  active: boolean,
  puzzleType: number
}

export type MessageSchema = typeof en;
export type AvailableLocales = 'en' | 'fr';
