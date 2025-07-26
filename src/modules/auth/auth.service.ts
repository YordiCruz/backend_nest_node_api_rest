import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../admin/users/entities/user.entity';

import {compare} from 'bcrypt';
import {hash} from 'bcrypt';

import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../admin/users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { json } from 'stream/consumers';

@Injectable()
export class AuthService {
    
    constructor(

        //@InjectRepository(User)
        //private usersRepository: Repository<User>,
        private userService: UsersService,
        private jwtService: JwtService

    ) {}

    async login(credenciales: LoginAuthDto) {

        const {email, password} = credenciales;

        //buscar el usuario por email
        const usuario = await this.userService.findOneByEmail(email);

        if (!usuario) {
            return new HttpException('El usuario no existe', 404);
        }

        //verificar la contraseña
        const verificarPass = await compare(password, usuario.password);
        if (!verificarPass) {
            return new HttpException('La contraseña es incorrecta', 401);
        }

        // jwt
        const payload = {id: usuario.id, username: usuario.username, email: usuario.email};
        
        const token = this.jwtService.sign(payload);
        //console.log({acces_token:token, user: usuario});
        


        return {acces_token:token, user: usuario};
   }


   async register(userObj: RegisterAuthDto){ {
    // const {password} = userObj;
    // const passHash = await hash(password, 12);
    // userObj = {...userObj, password: passHash};
     return this.userService.create(userObj);
   }
   }




}
