import { AreaLegal } from "./area-legal";

export interface Servicio{
    id: any;
    nombre: string;
    descripcion: string;
    area: AreaLegal;
    disponible: boolean
    createdAt: Date
    updatedAt: Date;
}