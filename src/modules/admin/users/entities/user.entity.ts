import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;


}
