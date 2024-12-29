
import { Abogado } from "./abogado";
import { TipoServicio } from "./tipoServicio";

export interface Consulta{
    id: any;
    tipoServicio: TipoServicio;
    fechaHora: string;
    detalles: string;
    nombreCompleto: string;
    email: string;
    //lugar: string;
    abogado?: Abogado;
    estado: string;
    hechos: string;
    createdAt: Date;
    updatedAt: Date;
}