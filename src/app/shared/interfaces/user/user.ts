export interface User {
  nick: string;
  subnick?: string;   // Datos no obligatorios ?
  age?: number;
  email: string;
  isFriend?: boolean
  uid: string | undefined;
  status?: string;
  avatar?: string
}
