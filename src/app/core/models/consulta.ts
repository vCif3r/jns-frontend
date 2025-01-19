import { Servicio } from "./servicio";
import { User } from "./user";

export interface Consulta{
    id: any;
    servicio: Servicio;
    fechaHora: string;
    detalles: string;
    nombreCompleto: string;
    email: string;
    abogado?: User ;
    estado: string;
    hechos: string;
    createdAt: Date;
    updatedAt: Date;
}