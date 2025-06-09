import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('permisos')
export class Permission {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ unique: true })
    nombre: string;
    
    @Column({ nullable: true })
    descripcion: string;

    @Column({ nullable: true })
    subject: string;

    @Column({ nullable: true })
    action: string;

}
