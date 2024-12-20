export interface Cliente {
    id: any;
    nombre: string;
    apellido: string;
    cedula: string;
    direccion: string;
    telefono: string;
    email: string;
    tipo_cliente?: string;
    fecha_nacimiento?: string;
    genero?: string;
    foto?: string
    pais?: string;
    estado_civil?: string;
}