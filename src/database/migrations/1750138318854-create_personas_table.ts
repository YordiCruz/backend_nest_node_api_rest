import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePersonasTable1750138318854 implements MigrationInterface {
    name = 'CreatePersonasTable1750138318854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "personas" ("id" SERIAL NOT NULL, "nombres" character varying(100) NOT NULL, "apellidos" character varying(100) NOT NULL, "fecha_nacimiento" date, "genero" character varying(20), "telefono" character varying(20), "direccion" text, "documento_identidad" character varying(20), "nacionalidad" character varying(50), "user_id" uuid, CONSTRAINT "REL_a5eea6c1723ca1e765836fb97b" UNIQUE ("user_id"), CONSTRAINT "PK_714aa5d028f8f3e6645e971cecd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "personas" ADD CONSTRAINT "FK_a5eea6c1723ca1e765836fb97b7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personas" DROP CONSTRAINT "FK_a5eea6c1723ca1e765836fb97b7"`);
        await queryRunner.query(`DROP TABLE "personas"`);
    }

}
