import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConciergeTelegramColumnToSystemSettings1651132956203 implements MigrationInterface {
    name = 'AddConciergeTelegramColumnToSystemSettings1651132956203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "system_settings" ADD "concierge_telegram" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "system_settings" DROP COLUMN "concierge_telegram"`);
    }

}
