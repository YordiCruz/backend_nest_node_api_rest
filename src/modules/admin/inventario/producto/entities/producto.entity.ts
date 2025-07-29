import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlmacenProducto } from "../../almacen/entities/almacen_producto.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity('productos')
export class Producto {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 200})
    nombre: string;

    @Column({type: 'text'})
    descripcion: string  

    @Column({length: 100, unique: true, nullable: true})
    codigo_barra: string

    @Column({length:50})
    unidad_medida: string

    @Column({length: 100, nullable: true})
    marca: string;

    @Column({type: 'decimal', precision: 12, scale: 2})
    precio_venta_actual: number;

    @Column({type: 'int', nullable: true})
    stock_minimo: number;

    @Column({length: 255, nullable: true})
    imagen_url: string

    @Column({default: true})
    activo: boolean

    @Column({type: 'date'})
    fecha_registro: Date

    @ManyToOne(() => Categoria, (categoria) => categoria.productos, {eager: true})
    categoria: Categoria


    @OneToMany(() => AlmacenProducto, (alp) => alp.productos)
    almacenes: AlmacenProducto[]





}
