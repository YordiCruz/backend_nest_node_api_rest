import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contacto } from "./contacto.entity";

@Entity('entidad_comercial')
export class EntidadComercial {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 20})
    tipo: 'cliente' | 'proveedor'

    @Column({length: 255})
    razon_social: string;

    @Column({length: 100, nullable: true})
    ci_nit_ruc_rut: string;
    
    @Column({length: 20, nullable: true})
    telefono: string;

    @Column({length: 255, nullable: true})
    direccion: string;

    @Column({length: 100, nullable: true})
    correo: string;

    @Column()
    activo: boolean;

    @OneToMany(() => Contacto, (contacto) => contacto.entidad_comercial)
    contactos: Contacto[];








}
