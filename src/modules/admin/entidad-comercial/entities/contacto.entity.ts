import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntidadComercial } from "./entidad-comercial.entity";

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

        @ManyToOne(() => EntidadComercial, (entidad) => entidad.contactos)
        entidad_comercial: EntidadComercial

}