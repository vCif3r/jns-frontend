export interface Post {
    id: any;
    titulo: string;
    contenido: string;
    categoria: string;
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