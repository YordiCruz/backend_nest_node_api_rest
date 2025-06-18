import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('contactos')
export class Contacto {

    
        @PrimaryGeneratedColumn()
        id: number;
    
        @Column({length: 255, nullable: true})
        nombre_completo: string;

        @Column({length: 100, nullable: true})
        rol_contacto: string;
    
        @Column({length: 20, nullable: true})
        telefono_secundario: string;
    
        @Column({length: 200, nullable: true})
        correo_secundario: string;

        @Column({type: 'text', nullable: true})
        observaciones: string;

}