import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { privateDecrypt } from 'crypto';

@Injectable()
export class UsersService {

  //habilitar la inyeccion de dependencias
  constructor(
  @InjectRepository(User)
  //para que funcione el Repository debemos de importar el typeorm en el modulo de users
  private usersRepository: Repository<User>
 ) {}

 async create(createUserDto: CreateUserDto): Promise<User> {
    // capturamos los mas importantes del dto y con ...rest capturamos el resto
    const {email, username, ...rest } = createUserDto;

    // verificar si ya existe el username
   const existeusername = await this.usersRepository.findOne({where: {username: username}});
   if (existeusername) {
     throw new BadRequestException(`El username "${username}" ya está en uso`);

   } 

   // verificar si ya existe el email
   const existeemail = await this.usersRepository.findOne({where: {email: email}});
   if (existeemail) {
     throw new BadRequestException(`El email "${email}" ya está en uso`);
   
    }

    const newUser = this.usersRepository.create({
      username, email, ...rest
    });
    return this.usersRepository.save(newUser);

  }

  //asignamos tipo de returno para que nos devuelva una promesa con un array
  findAll(): Promise<User[]> {

    return this.usersRepository.find();
  }

async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException(`El usuario con "${id}" no existe`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    //reutilizamos la funcion anterior
    const user = await this.findOne(id);
    //podemos asignar un proceso de cambio de datos
    //diciendo que vamos a reemplazar todo lo que llega en updateUserDto a user
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  // en este caso no estamos retornando nada por eso la promesa es void
  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`El usuario con "${id}" no existe`);
    }
  
  }
}

