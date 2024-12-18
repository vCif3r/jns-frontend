import { Abogado } from './abogado';
import { Cliente } from "./cliente";

export interface Caso{
    id: any;
    cliente: Cliente;
    abogado: Abogado;
    titulo: string;
    descripcion: string;
    estado: string;
    createdAt: Date;
    updatedAt: Date;
}