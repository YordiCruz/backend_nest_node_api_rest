import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "../../permissions/entities/permission.entity";
import e from "express";

@Entity('roles')
export class Role {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ unique: true })
    nombre: string;

    @Column({ nullable: true })
    descripcion: string;

    @ManyToMany(() => Permission, {eager: true})
    @JoinTable({
        name: 'roles_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id'
        }
    })
    permissions: Permission[];
    
}
