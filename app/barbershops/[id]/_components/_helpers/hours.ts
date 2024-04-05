import { setHours, setMinutes, format, addMinutes } from "date-fns";

export function generateDayTimeList(date: Date): string[] {
  const startTime = setMinutes(setHours(date, 9), 0); //definindo  que as reservas começaram a partir desse horario (9 horas)
  const endTime = setMinutes(setHours(date, 21), 0); // definindo que as reservas terminarão nesse horario (21 horas)
  const interval = 45; //intervalo entre as reservas
  const timeList: string[] = [];

  let currentTime = startTime;

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}
