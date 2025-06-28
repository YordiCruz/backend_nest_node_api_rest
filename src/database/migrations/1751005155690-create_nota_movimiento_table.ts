import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotaMovimientoTable1751005155690 implements MigrationInterface {
    name = 'CreateNotaMovimientoTable1751005155690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movimientos" ("id" SERIAL NOT NULL, "tipo_nota" character varying NOT NULL, "cantidad" integer NOT NULL, "tipo_movimientos" character varying(20) NOT NULL, "precio_unitario_compra" numeric(12,2) NOT NULL, "precio_unitario_venta" numeric(12,2) NOT NULL, "total_linea" numeric(12,2) NOT NULL, "observaciones" text, "notaId" integer, "productoId" integer, "almacenId" integer, CONSTRAINT "PK_519702aa97def3e7c1b6cc5e2f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nota" ("id" SERIAL NOT NULL, "codigo_nota" character varying NOT NULL, "fecha_emision" date NOT NULL, "tipo_nota" character varying NOT NULL, "subtotal" numeric(12,2), "impuestos" numeric(12,2), "descuento_total" numeric(12,2), "total_calculado" numeric(12,2) NOT NULL, "estado_nota" character varying(50) NOT NULL, "observaciones" text, "entidadComercialIdId" integer, "userId" uuid, CONSTRAINT "PK_0b416af9c0ccf8deed7b568b5ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_6b86c0b2260b156dab7e1da872b" FOREIGN KEY ("notaId") REFERENCES "nota"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_bb83d42e45a0025561edbf6652a" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movimientos" ADD CONSTRAINT "FK_f0715d29735042ca1b992a550ab" FOREIGN KEY ("almacenId") REFERENCES "almacenes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nota" ADD CONSTRAINT "FK_350d4d9dbedf9261e6305b7649e" FOREIGN KEY ("entidadComercialIdId") REFERENCES "entidad_comercial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nota" ADD CONSTRAINT "FK_fc61a51d0cb634428de2993244f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nota" DROP CONSTRAINT "FK_fc61a51d0cb634428de2993244f"`);
        await queryRunner.query(`ALTER TABLE "nota" DROP CONSTRAINT "FK_350d4d9dbedf9261e6305b7649e"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_f0715d29735042ca1b992a550ab"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_bb83d42e45a0025561edbf6652a"`);
        await queryRunner.query(`ALTER TABLE "movimientos" DROP CONSTRAINT "FK_6b86c0b2260b156dab7e1da872b"`);
        await queryRunner.query(`DROP TABLE "nota"`);
        await queryRunner.query(`DROP TABLE "movimientos"`);
    }

}
