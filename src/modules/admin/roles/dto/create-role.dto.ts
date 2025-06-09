import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateRoleDto {
    @IsString()
    nombre: string;
    
    @IsString()
    descripcion: string;
    
    @IsOptional()
    @IsArray()
    @IsUUID('4', {each: true})
    permissionsIds?: string[];

}
