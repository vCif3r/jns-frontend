
import { Consulta } from './consulta';

export interface Caso{
    id: any;
    codigo: string;
    consulta: Consulta;
    estado: string;
    createdAt: Date;
    updatedAt: Date;
}