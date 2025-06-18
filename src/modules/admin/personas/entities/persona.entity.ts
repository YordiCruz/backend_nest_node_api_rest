import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('personas')
export class Persona {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    nombres: string;
    
    @Column({length: 100})
    apellidos: string;

    @Column({type: 'date', nullable: true})
    fecha_nacimiento: Date;

    @Column({length: 20, nullable: true})
    genero: string;

    @Column({length: 20, nullable: true})
    telefono: string;

    @Column({type: 'text', nullable: true})
    direccion: string;

    @Column({length: 20, nullable: true})
    documento_identidad: string;

    @Column({length: 50, nullable: true})
    nacionalidad: string;

    @OneToOne(() => User, {nullable: true})
    @JoinColumn({ name: 'user_id' })
    user: User;




}
