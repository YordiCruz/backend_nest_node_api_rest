import { User } from "../interfaces/login-interface";

export class RegisterAuthDto implements User{
    username?: string | undefined;
    email: string;
    password: string;
    
}