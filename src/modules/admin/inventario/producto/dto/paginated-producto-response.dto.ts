import { ProductoResponseDto } from "./producto-response.dto";

//no es para validar es para dar formato de respuesta
export class PaginatedProductoResponseDto {
    data: ProductoResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    search?: string;
    sortBy?: string;
    order?: 'ASC' | 'DESC';
    almacen?: number;
    activo?: boolean
}