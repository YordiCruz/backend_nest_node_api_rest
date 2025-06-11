import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../admin/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../admin/users/users.module';
import { constants } from 'buffer';
import { jwtConstants } from './constants';

@Module({
  imports: [
    //TypeOrmModule.forFeature([User]),

  //importamos el usermodule, para utilizar los servicios, despues en auth.service
  UsersModule,

  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '60m'}
  })

],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
