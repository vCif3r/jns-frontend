
import { Consulta } from './consulta';

export interface Caso{
    id: any;
    consulta: Consulta;
    estado: string;
    createdAt: Date;
    updatedAt: Date;
}