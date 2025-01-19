import { Role } from "./role";

export interface User {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    cedula: string;
    especialidad?: string;
    direccion: string;
    telefono?: string;
    genero?: string;
    pais?: string;
    foto?: string;
    role: Role
}