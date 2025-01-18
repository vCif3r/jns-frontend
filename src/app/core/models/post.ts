export interface Post {
    id: any;
    titulo: string;
    contenido: string;
    resumen: string;
    categoria: string;
    publicado: string
    imagen: string;
    createdAt: Date;
    updateAt: Date;
}

export interface PostResponse {
    data: Post[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}