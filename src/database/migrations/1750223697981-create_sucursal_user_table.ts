import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSucursalUserTable1750223697981 implements MigrationInterface {
    name = 'CreateSucursalUserTable1750223697981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sucursales" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "direccion" character varying(255) NOT NULL, "telefono" character varying(20) NOT NULL, "ciudad" character varying(100) NOT NULL, CONSTRAINT "PK_c2232960c9e458db5b18d35eeba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sucursal_user" ("id" SERIAL NOT NULL, "userId" uuid, "sucursalId" integer, "roleId" uuid, CONSTRAINT "PK_a656e16193e79a38d7140c1cff8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sucursal_user" ADD CONSTRAINT "FK_7ac706d1ad541e840a22fbf480b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sucursal_user" ADD CONSTRAINT "FK_f67bf385e4972c663b4b3dfbe46" FOREIGN KEY ("sucursalId") REFERENCES "sucursales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sucursal_user" ADD CONSTRAINT "FK_5e018fcddfeb91abab238e7c756" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sucursal_user" DROP CONSTRAINT "FK_5e018fcddfeb91abab238e7c756"`);
        await queryRunner.query(`ALTER TABLE "sucursal_user" DROP CONSTRAINT "FK_f67bf385e4972c663b4b3dfbe46"`);
        await queryRunner.query(`ALTER TABLE "sucursal_user" DROP CONSTRAINT "FK_7ac706d1ad541e840a22fbf480b"`);
        await queryRunner.query(`DROP TABLE "sucursal_user"`);
        await queryRunner.query(`DROP TABLE "sucursales"`);
    }

}
