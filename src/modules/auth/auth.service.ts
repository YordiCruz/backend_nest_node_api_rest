import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../admin/users/entities/user.entity';

import {compare} from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
@Injectable()
export class AuthService {
    
    constructor(

        @InjectRepository(User)
        private usersRepository: Repository<User>,

    ) {}

    async login(credenciales: LoginAuthDto) {

        const {email, password} = credenciales;

        //buscar el usuario por email
        const usuario = await this.usersRepository.findOne({where: {email: email}});

        if (!usuario) {
            return new HttpException('El usuario no existe', 404);
        }

        //verificar la contraseña
        const verificarPass = await compare(password, usuario.password);
        if (!verificarPass) {
            return new HttpException('La contraseña es incorrecta', 401);
        }

        return {user: usuario};
   }
}
