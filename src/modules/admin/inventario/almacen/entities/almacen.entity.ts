import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sucursal } from "../../sucursal/entities/sucursal.entity";
import { AlmacenProducto } from "./almacen_producto.entity";

@Entity('almacenes')
export class Almacen {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100})
    nombre: string

    @Column({length: 100, nullable: true})
    codigo: string

    @Column({type: 'text', nullable: true})
    descripcion: string;

    @ManyToOne(() => Sucursal, (sucursal) => sucursal.almacenes, {eager: true})
    sucursal: Sucursal;

    @OneToMany(() => AlmacenProducto, (alp) => alp.almacen)
    productos: AlmacenProducto[]


}
