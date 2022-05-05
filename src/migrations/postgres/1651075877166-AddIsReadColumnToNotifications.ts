import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsReadColumnToNotifications1651075877166 implements MigrationInterface {
    name = 'AddIsReadColumnToNotifications1651075877166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" ADD "is_read" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "is_read"`);
    }

}
