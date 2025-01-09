export class GameEntry {
  gameId: number; // ID único del juego (referencia a un juego en la base de datos)
  addedAt: Date; // Fecha en que el juego fue agregado a la biblioteca
  hoursPlayed?: number; // (Opcional) Horas jugadas
  achievements?: string[]; // (Opcional) Logros obtenidos en el juego

  constructor(
    gameId: number,
    addedAt: Date = new Date(),
    hoursPlayed: number = 0,
    achievements: string[] = []
  ) {
    this.gameId = gameId;
    this.addedAt = addedAt;
    this.hoursPlayed = hoursPlayed;
    this.achievements = achievements;
  }
}
