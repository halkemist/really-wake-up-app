export interface Alarm {
  id: number,
  name: string,
  time: string, // HH:mm (24h)
  days: Array<number>,
  active: boolean,
  puzzleType: number
}