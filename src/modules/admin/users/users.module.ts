import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Module({
  //para que funcione el userRepository importamos el typeorm
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService],

  //para poder utilizarlo en auth.module
  exports: [UsersService]

})
export class UsersModule {}
