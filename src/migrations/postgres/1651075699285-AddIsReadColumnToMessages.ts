import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsReadColumnToMessages1651075699285 implements MigrationInterface {
  name = 'AddIsReadColumnToMessages1651075699285';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "messages" ADD "is_read" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(
      `ALTER TABLE "additional_services" ADD CONSTRAINT "FK_56f734e9cca040a900853e6cde5" FOREIGN KEY ("category_id") REFERENCES "additional_service_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "additional_services" DROP CONSTRAINT "FK_56f734e9cca040a900853e6cde5"`);
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "is_read"`);
  }
}
