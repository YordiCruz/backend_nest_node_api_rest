import { IsBoolean, IsEAN, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Entity } from "typeorm";

@Entity()
export class CreateEntidadComercialDto {
    @IsIn(['cliente', 'proveedor'])
    tipo: 'cliente' | 'proveedor'

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    razon_social: string

    @IsString()
    @IsOptional()
    @MaxLength(100)
    ci_nit_ruc_rut?: string

    @IsString()
    @IsOptional()
    @MaxLength(20)
    telefono?: string

    @IsString()
    @IsOptional()
    @MaxLength(255)
    direccion?: string

    @IsEmail()
    @IsOptional()
    correo?: string

    @IsBoolean()
    activo: boolean
}
