import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { User } from "../interfaces/login-interface";
import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthDto implements User{
       
   @ApiProperty({description: 'ingrese un correo valido', default: '', example: 'user@gmail'})
   @IsEmail()
   @IsNotEmpty()
   email: string;
   
   @ApiProperty()
   @MinLength(8)
   @MaxLength(25)
   @IsNotEmpty()
   password: string;
    
}