import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { User } from "../interfaces/login-interface";

export class LoginAuthDto implements User{
   
   @IsEmail()
   @IsNotEmpty()
   email: string;
   
   @MinLength(8)
   @MaxLength(25)
   @IsNotEmpty()
   password: string;
    
}