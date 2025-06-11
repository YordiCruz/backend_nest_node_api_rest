import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../interfaces/login-interface";

export class RegisterAuthDto implements User{
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(200)
    password: string;

}