import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFullNameToOrder1650794683847 implements MigrationInterface {
    name = 'AddFullNameToOrder1650794683847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "full_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotel_services" ADD CONSTRAINT "FK_31a645ca4f3e73871835421c5e6" FOREIGN KEY ("category_id") REFERENCES "hotel_service_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "foods" ADD CONSTRAINT "FK_5152fefa8abc8a3bd6d284a404e" FOREIGN KEY ("category_id") REFERENCES "food_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "foods" DROP CONSTRAINT "FK_5152fefa8abc8a3bd6d284a404e"`);
        await queryRunner.query(`ALTER TABLE "hotel_services" DROP CONSTRAINT "FK_31a645ca4f3e73871835421c5e6"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "full_name"`);
    }

}
