import { GameEntry } from './GameEntry';

export class User {
  id: string; // ID único del usuario (generalmente generado por Firebase Auth)
  username: string; // Nombre de usuario o apodo
  email: string; // Correo electrónico del usuario
  profilePicture: string; // URL de la imagen de perfil (opcional)
  friends: string[]; // Lista de IDs de amigos (referencia a otros usuarios)
  library: GameEntry[]; // Lista de juegos en la biblioteca del usuario
  createdAt: Date; // Fecha de creación del usuario
  lastLogin: Date; // Última fecha en que el usuario inició sesión
  constructor(
    id: string,
    username: string,
    email: string,
    profilePicture: string,
    friends: string[] = [],
    library: GameEntry[] = [],
    createdAt: Date = new Date(),
    lastLogin: Date = new Date()
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.profilePicture = profilePicture;
    this.friends = friends;
    this.library = library;
    this.createdAt = createdAt;
    this.lastLogin = lastLogin;
  }
}
