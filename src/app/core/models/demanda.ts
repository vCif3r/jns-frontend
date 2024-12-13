import { Abogado } from "./abogado";
import { Cliente } from "./cliente";

export interface Demanda{
    id: number;
    tipo: string;
    titulo: string;
    descripcion: string;
    fecha_creacion?: Date;
    cliente: Cliente;
    abogado: Abogado;
    estado: string;
}