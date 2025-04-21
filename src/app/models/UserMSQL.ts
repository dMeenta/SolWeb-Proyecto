export interface UserMSQL {
  uid: string; // El ID único del usuario
  email: string; // El email del usuario
  username: string; // El nombre de usuario
  profilePicture: string; // URL de la foto de perfil (opcional)
  role?: 'USER' | 'ADMIN'; // El rol siempre será 'USER'
  biography?: string; // Biografía del usuario (opcional)
  creationDate?: string; // Fecha de creación del usuario (en formato ISO 8601)
}
