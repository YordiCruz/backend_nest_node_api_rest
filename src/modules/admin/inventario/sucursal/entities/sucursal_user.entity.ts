import { User } from "./../../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sucursal } from "./sucursal.entity";
import { Role } from "./../../../roles/entities/role.entity";

@Entity('sucursal_user')
export class SucursalUser {

    @PrimaryGeneratedColumn()
    id: number;
        
    @ManyToOne(() => User, (user) => user.id, { eager: true })
    user: User;

    @ManyToOne(() => Sucursal, (sucursal) => sucursal.usuarios, { eager: true })
    sucursal: Sucursal;

    @ManyToOne(() => Role, { nullable: true, eager: true })
    role: Role;

}