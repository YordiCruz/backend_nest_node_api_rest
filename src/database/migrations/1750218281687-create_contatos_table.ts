import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateContatosTable1750218281687 implements MigrationInterface {
    name = 'CreateContatosTable1750218281687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contactos" ("id" SERIAL NOT NULL, "nombre_completo" character varying(255), "rol_contacto" character varying(100), "telefono_secundario" character varying(20), "correo_secundario" character varying(200), "observaciones" text, CONSTRAINT "PK_d8a88d3690915aba8dc617a7ffd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contactos"`);
    }

}
