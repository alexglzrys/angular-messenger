export interface User {
  nick: string;
  subnick?: string;   // Datos no obligatorios ?
  age?: number;
  email: string;
  friend: boolean
  uid: string;
}
