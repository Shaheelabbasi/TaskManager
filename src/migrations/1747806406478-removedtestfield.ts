import { MigrationInterface, QueryRunner } from "typeorm";

export class Removedtestfield1747806406478 implements MigrationInterface {
    name = 'Removedtestfield1747806406478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "test" character varying NOT NULL`);
    }

}
