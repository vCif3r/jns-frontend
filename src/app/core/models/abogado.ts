import { Pais } from "./pais";

export interface Abogado {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    cedula: string;
    especialidad: string;
    pais: Pais
    fecha_ingreso: Date;
}