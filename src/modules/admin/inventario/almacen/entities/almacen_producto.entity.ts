import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sucursal } from "../../sucursal/entities/sucursal.entity";
import { Almacen } from "./almacen.entity";
import { Producto } from "../../producto/entities/producto.entity";

@Entity('almacen_producto')
export class AlmacenProducto {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'int'})
    cantidad_actual: number

    @Column({type: 'date'})
    fecha_actualizacion: Date

    @ManyToOne(() => Almacen, (almacen) => almacen.productos, {eager: true})
    @JoinColumn({ name: 'almacenId' }) // Asegura que coincida con tu DB
    almacen: Almacen;

    @ManyToOne(() => Producto, (producto) => producto.almacenes, {eager: true})
    @JoinColumn({ name: 'productosId' })
    productos: Producto;
    


}
