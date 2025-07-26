import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {

  //habilitar la inyeccion de dependencias
  constructor(
  @InjectRepository(User)
  //para que funcione el Repository debemos de importar el typeorm en el modulo de users
  private usersRepository: Repository<User>,
  @InjectRepository(Role)
  private rolesRepository: Repository<Role>

 ) {}

 async create(createUserDto: CreateUserDto): Promise<any> {
    // capturamos los mas importantes del dto y con ...rest capturamos el resto
    const {email, username, roleIds, ...rest } = createUserDto;

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

    //roles 
    let roles: Role[] = [];

    if (roleIds?.length) {
      roles = await this.rolesRepository.find({where: {id: In(roleIds)}});
      if (roles.length !== roleIds.length) {
        throw new BadRequestException(`Los roles no existen`);
      }
    }



    //encriptar la password
   // console.log(rest);
    // el 12 es la cantidad de rondas de encriptacion mientas ma alta sea mas seguro sera
    const hashPassword = await bcrypt.hash(rest.password, 12);
    //console.log(hashPassword);
    const newUser = this.usersRepository.create({
      //deberia de ser asi username: username pero como es el mismo nombre no es necesario
      username, 
      email, 
      password: hashPassword,
      roles
    });

    this.usersRepository.save(newUser);
    const {password, ...resto_datos} = newUser


    return resto_datos;

  }

  //asignamos tipo de return para que nos devuelva una promesa con un array
  async findAll(page: number=1, limit: number=10, search: string = '')/*: Promise<User[]>*/ {
  const queryBuilder =  this.usersRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.roles', 'roles')
    .leftJoinAndSelect('roles.permissions', 'permission')
    //el % indica cualquier valor al inicio o al final
    .where('user.username LIKE :search OR user.email LIKE :search', {search: `%${search}%`})

    queryBuilder.skip((page - 1) * 10).take(limit);
    //getManyAndCount obtiene los datos y el total de datos
    const [users, total] = await queryBuilder.getManyAndCount();

    //calcular el total de paginas
    const totalPages = Math.ceil(total / limit);

    return {
     data: users,
      total,
      page,
      limit,
      totalPages,
      search
    }


   // return this.usersRepository.find();
  }

async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException(`El usuario con "${id}" no existe`);
    }
    return user;
  }

  //definimos el findbyemail
  async findOneByEmail(email: string){
     const user = await this.usersRepository.findOneBy({email});
    if (!user) {
      throw new NotFoundException(`El usuario con "${email}" no existe`);
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

