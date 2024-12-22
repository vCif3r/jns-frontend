import { TipoServicio } from "./tipoServicio";

export interface Servicio{
    id: any;
    nombre: string;
    descripcion: string;
    categoria: string;
    disponible: boolean
    createdAt: Date
    updatedAt: Date;
    tipos_servicios?: TipoServicio[];
}