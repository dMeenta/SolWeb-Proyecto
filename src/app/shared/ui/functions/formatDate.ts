/**
 * Convierte timestamp a objeto Date
 * @param timestamp Timestamp en segundos (number o string)
 * @returns Objeto Date
 */
export function convertTimestampToDate(timestamp: number | string): Date {
  const timestampMs =
    typeof timestamp === 'number' ? timestamp * 1000 : Number(timestamp) * 1000;
  return new Date(timestampMs);
}

/**
 * Obtiene solo la fecha (día, mes y año) en formato local
 * @param timestamp Timestamp en segundos (number o string)
 * @returns String en formato 'DD/MM/YYYY'
 */
export function getDateOnly(timestamp: number | string): string {
  const date = convertTimestampToDate(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Obtiene solo la hora (horas y minutos) en formato local
 * @param timestamp Timestamp en segundos (number o string)
 * @returns String en formato 'HH:MM' (24 horas)
 */
export function getTimeOnly(timestamp: number | string): string {
  const date = convertTimestampToDate(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Versión alternativa que devuelve objetos separados
 */
export function getSplitDateTime(timestamp: number | string): {
  date: string;
  time: string;
} {
  const date = convertTimestampToDate(timestamp);
  return {
    date: getDateOnly(date.getTime() / 1000), // Convertimos Date a timestamp
    time: getTimeOnly(date.getTime() / 1000),
  };
}
