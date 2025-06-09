import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    //como es un sistema interno entonces directo le vamos a activar al usuario como activo, puede aver usuarios que puedan registrarse fuera del sistema entonces los usuarios entraran en modo inactivo para que no puedan manipular el sistema
    @Column({ default: true })
    isActive: boolean;

    @ManyToMany(()=> Role, {eager: true})
    @JoinTable({
        name: 'users_roles',
        joinColumn: {
            name: 'user_id'
        },
        inverseJoinColumn: {
            name: 'role_id'
        }
    })
    roles: Role[];


    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;


}
