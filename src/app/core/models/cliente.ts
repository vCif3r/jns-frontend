import { Pais } from "./pais";

export interface Cliente {
    nombre: string;
    apellido: string;
    cedula: string;
    direccion: string;
    telefono: string;
    email: string;
    tipo_cliente: string;
    fecha_nacimiento: string;
    genero: string;
    foto: string
    pais: Pais;
    estado_civil: string;
}