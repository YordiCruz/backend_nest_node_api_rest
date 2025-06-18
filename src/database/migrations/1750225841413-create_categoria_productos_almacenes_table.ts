import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoriaProductosAlmacenesTable1750225841413 implements MigrationInterface {
    name = 'CreateCategoriaProductosAlmacenesTable1750225841413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "descripcion" text, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" SERIAL NOT NULL, "nombre" character varying(200) NOT NULL, "descripcion" text NOT NULL, "codigo_barra" character varying(100), "unidad_medida" character varying(50) NOT NULL, "marca" character varying(100), "precio_venta_actual" numeric(12,2) NOT NULL, "stock_minimo" integer, "imagen_url" character varying(255), "activo" boolean NOT NULL, "fecha_registro" date NOT NULL, "categoriaId" integer, CONSTRAINT "UQ_647fcfd04561ae0409381e4de76" UNIQUE ("codigo_barra"), CONSTRAINT "PK_04f604609a0949a7f3b43400766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "almacen_producto" ("id" SERIAL NOT NULL, "cantidad_actual" integer NOT NULL, "fecha_actualizacion" date NOT NULL, "almacenId" integer, "productosId" integer, CONSTRAINT "PK_d012ea8045175d18843e998dea7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "almacenes" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "codigo" character varying(100), "descripcion" text, "sucursalId" integer, CONSTRAINT "PK_2af9818dc2019bc97c7d26217e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "almacen_producto" ADD CONSTRAINT "FK_696fa0d027c3bfd994ab1b8ecaa" FOREIGN KEY ("almacenId") REFERENCES "almacenes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "almacen_producto" ADD CONSTRAINT "FK_9fd1e028b0f3489050471c809b2" FOREIGN KEY ("productosId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "almacenes" ADD CONSTRAINT "FK_f925acc11f5654a6be6ba3855fa" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "almacenes" DROP CONSTRAINT "FK_f925acc11f5654a6be6ba3855fa"`);
        await queryRunner.query(`ALTER TABLE "almacen_producto" DROP CONSTRAINT "FK_9fd1e028b0f3489050471c809b2"`);
        await queryRunner.query(`ALTER TABLE "almacen_producto" DROP CONSTRAINT "FK_696fa0d027c3bfd994ab1b8ecaa"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_aee00189e42dd8880cdfe1bb1e7"`);
        await queryRunner.query(`DROP TABLE "almacenes"`);
        await queryRunner.query(`DROP TABLE "almacen_producto"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
    }

}
