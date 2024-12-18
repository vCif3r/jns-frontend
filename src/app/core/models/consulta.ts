import { Servicio } from "./servicio";

export interface Consulta{
    id: number;
    servicio: Servicio
    tipo_servicio: string;
    fecha: string;
    hora: string;
    detalles: string;
    demandante: string;
    correo: string;
    //lugar: string;
    hechos: string;
}