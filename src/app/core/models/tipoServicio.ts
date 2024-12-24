import { Servicio } from "./servicio";

export interface TipoServicio{
    id: any;
    nombre: string;
    servicio: Servicio;
    descripcion: string;
    estado: string;
}