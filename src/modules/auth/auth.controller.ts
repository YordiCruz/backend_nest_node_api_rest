import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post("/login")
    funLogin(@Body() datos: LoginAuthDto) {
        return this.authService.login(datos);
    }

    @Post("/register")
    funRegistrarusuario(@Body() userObj: RegisterAuthDto){
        return this.authService.register(userObj);
    }

    @UseGuards(AuthGuard)
    @Get("/profile")
    funPefil(@Request() req) {
        return req.user;
    }


}
