import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntidadComercialTable1750221015819 implements MigrationInterface {
    name = 'CreateEntidadComercialTable1750221015819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entidad_comercial" ("id" SERIAL NOT NULL, "tipo" character varying(20) NOT NULL, "razon_social" character varying(255) NOT NULL, "ci_nit_ruc_rut" character varying(100), "telefono" character varying(20), "direccion" character varying(255), "correo" character varying(100), "activo" boolean NOT NULL, CONSTRAINT "PK_36ff434cdbe22a05d527b4fe086" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contactos" ADD "entidadComercialId" integer`);
        await queryRunner.query(`ALTER TABLE "contactos" ADD CONSTRAINT "FK_0abb7af42d2949baa946b799a0e" FOREIGN KEY ("entidadComercialId") REFERENCES "entidad_comercial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contactos" DROP CONSTRAINT "FK_0abb7af42d2949baa946b799a0e"`);
        await queryRunner.query(`ALTER TABLE "contactos" DROP COLUMN "entidadComercialId"`);
        await queryRunner.query(`DROP TABLE "entidad_comercial"`);
    }

}
