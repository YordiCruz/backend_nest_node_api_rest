import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntidadComercial } from "../../entidad-comercial/entities/entidad-comercial.entity";
import { User } from "../../users/entities/user.entity";
import { Nota } from "./nota.entity";
import { Producto } from "../../inventario/producto/entities/producto.entity";
import { Almacen } from "../../inventario/almacen/entities/almacen.entity";

@Entity('movimientos')
export class Movimientos {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Nota, nota => nota.movimientos)
    nota: Nota;

    @ManyToOne(() => Producto, {eager: true})
    producto: Producto;

    @Column()
    tipo_nota: string; // 'compra' | 'venta' 

    @ManyToOne(() => Almacen, {eager: true})
    almacen: Almacen;

    @Column({type: "int"})
    cantidad: number;

    @Column({type: "varchar", length: 20})
    tipo_movimientos: 'ingreso' | 'salida' | 'devolucion';

    @Column({type: "decimal", precision: 12, scale: 2})
    precio_unitario_compra: number;

    @Column({type: "decimal", precision: 12, scale: 2})
    precio_unitario_venta: number;

    @Column({type: "decimal", precision: 12, scale: 2})
    total_linea: number;

    @Column({type: "text", nullable: true})
    observaciones: string;


}
