import { MigrationInterface, QueryRunner } from "typeorm";

export class Renamedtestfield1747645933973 implements MigrationInterface {
    name = 'Renamedtestfield1747645933973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "Test" TO "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "test" TO "Test"`);
    }

}
