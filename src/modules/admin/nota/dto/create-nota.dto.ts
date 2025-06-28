import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateNotaDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    codigo_nota: string;

    @ApiProperty()
    @IsDateString()
    fecha_emision: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tipo_nota: string; // 'compra' | 'venta' 
    
    @ApiProperty()
    @IsNumber()
    entidad_comercial_id: number;

    @ApiProperty()
    @IsString()
    @IsUUID('4', {each: true})
    user_id: string;

    @ApiProperty({required: false})
    @IsDecimal()
    @IsOptional()
    subtotal?: number;
    
    @ApiProperty({required: false})
    @IsDecimal()
    @IsOptional()
    impuestos?: number;

    @ApiProperty({required: false})
    @IsDecimal()
    @IsOptional()
    descuento_total?: number;

    @ApiProperty()
    @IsDecimal()
    total_calculado: number;

    @ApiProperty()
    @IsString()
    estado_nota: string;
    
    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    observaciones?: string;
    
    //movimientos
    @ApiProperty()
    @IsArray()
    movimientos: MovimientoDto[];
}

class MovimientoDto {

    @ApiProperty()
    @IsNumber()
    producto_id: number;

    @ApiProperty()
    @IsNumber()
    almacen_id: number;

    @ApiProperty()
    @IsNumber()
    cantidad: number;
    
    @ApiProperty()
    @IsString()
    tipo_movimientos: 'ingreso' | 'salida' | 'devolucion';

    @ApiProperty()
    @IsDecimal()
    precio_unitario_compra: number;


    @ApiProperty()
    @IsDecimal()
    precio_unitario_venta: number;

    @ApiProperty()
    @IsDecimal()
    total_linea: number;

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    observaciones?: string;
}
