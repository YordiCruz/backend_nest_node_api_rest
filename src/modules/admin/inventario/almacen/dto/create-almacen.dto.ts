import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateAlmacenDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(100)
    codigo: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsInt()
    sucursal: number
    
}
