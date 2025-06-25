import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateProductoDto {

    @ApiProperty()
    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    nombre: string

    @ApiProperty({nullable: true})
    @IsString()
    @IsOptional()
    descripcion?: string

    @ApiProperty({nullable: true})
    @IsString()
    @IsOptional()
    @MaxLength(100)
    codigo_barra?: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    unidad_medida: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(100)
    marca?: string

    @ApiProperty({type: 'string', default: "0.00"})
    @IsDecimal()
    precio_venta_actual: number

    @ApiProperty({type: 'number'})
    @IsInt()
    @IsOptional()
    stock_minimo?: number

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(255)
    imagen_url?: string

    @ApiProperty({type: 'boolean'})
    @IsBoolean()
    activo: boolean

    @ApiProperty()
    @IsDateString()
    fecha_registro: Date

    @ApiProperty()
    @IsInt()
    categoriaId: number




}
