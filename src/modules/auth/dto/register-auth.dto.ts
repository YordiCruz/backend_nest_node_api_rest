import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../interfaces/login-interface";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterAuthDto implements User{
   
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
    @MaxLength(200)
    password: string;

}