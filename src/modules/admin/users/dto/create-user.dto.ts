import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;


    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(200) //cifrar contraseña
    password: string; 

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @IsUUID('4', {each: true})
    roleIds?: string[]
}
