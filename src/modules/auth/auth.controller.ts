import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post("/login")
    funLogin(@Body() datos: LoginAuthDto) {
        return this.authService.login(datos);
    }
}
