import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SucursalUser } from "./sucursal_user.entity";
import { Almacen } from "../../almacen/entities/almacen.entity";

@Entity('sucursales')
export class Sucursal {

    
    @PrimaryGeneratedColumn()
    id: number;
        
    @Column({length: 100})
    nombre: string;

    @Column({length: 255})
    direccion: string;

    @Column({length: 20})
    telefono: string;

    @Column({length: 100})
    ciudad: string;

    @OneToMany(() => SucursalUser, (su) => su.sucursal)
    usuarios: SucursalUser[];

    @OneToMany(() => Almacen, (almacen) => almacen.sucursal)
    almacenes: Almacen[]
    









}
