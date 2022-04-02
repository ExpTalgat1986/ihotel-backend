import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialEntitiesCreate1648299338328 implements MigrationInterface {
  name = 'InitialEntitiesCreate1648299338328';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "advertising_banners" ("id" SERIAL NOT NULL, "banner_url" character varying NOT NULL, "banner_img" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b7e007dc0c86e6d2830736cf7ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "additional_services" ("id" SERIAL NOT NULL, "category_id" integer NOT NULL, "image_url" character varying, "title_ru" character varying NOT NULL, "title_en" character varying NOT NULL, "title_kz" character varying NOT NULL, "description_ru" character varying NOT NULL, "description_en" character varying NOT NULL, "description_kz" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "is_available" boolean NOT NULL, CONSTRAINT "PK_3bdbcd5acd1a5229dfb92261667" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" BIGSERIAL NOT NULL, "guest_number" character varying NOT NULL, "message" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "food_categories" ("id" SERIAL NOT NULL, "image_url" character varying, "title_ru" character varying NOT NULL, "title_en" character varying NOT NULL, "title_kz" character varying NOT NULL, CONSTRAINT "PK_b7818b6140a91907d79e0aba514" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders_statuses" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_ea927ea6923c86128b75920b7f7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sections" ("id" SERIAL NOT NULL, "image_url" character varying NOT NULL, "name_ru" character varying NOT NULL, "name_kk" character varying NOT NULL, "name_en" character varying NOT NULL, "slug" character varying, "link" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "foods" ("id" SERIAL NOT NULL, "category_id" integer NOT NULL, "icon_url" character varying, "image_url" character varying, "title_ru" character varying NOT NULL, "title_en" character varying NOT NULL, "title_kz" character varying NOT NULL, "description_ru" character varying NOT NULL, "description_en" character varying NOT NULL, "description_kz" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "is_available" boolean NOT NULL, CONSTRAINT "PK_0cc83421325632f61fa27a52b59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "iin" character varying(12), "password" character varying NOT NULL, "role_id" integer NOT NULL DEFAULT '1', "first_name" character varying NOT NULL, "last_name" character varying, "phone_number" character varying(12) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "additional_service_categories" ("id" SERIAL NOT NULL, "icon_url" character varying, "image_url" character varying, "title_ru" character varying NOT NULL, "title_en" character varying NOT NULL, "title_kz" character varying NOT NULL, CONSTRAINT "PK_83ebe05412cf6dc0f5afeea284a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "system_settings" ("id" SERIAL NOT NULL, "favicon_url" character varying, "main_logo_url" character varying NOT NULL, "application_name" character varying NOT NULL, "welcome_text" character varying NOT NULL, "concierge_phone" character varying NOT NULL, CONSTRAINT "PK_82521f08790d248b2a80cc85d40" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notifications" ("id" BIGSERIAL NOT NULL, "title_ru" character varying NOT NULL, "title_kz" character varying NOT NULL, "title_en" character varying NOT NULL, "text_ru" character varying NOT NULL, "text_kz" character varying NOT NULL, "text_en" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hotel_service_categories" ("id" SERIAL NOT NULL, "image_url" character varying, "title_ru" character varying NOT NULL, "title_en" character varying NOT NULL, "title_kz" character varying NOT NULL, CONSTRAINT "PK_81bea4f19c2add053d088a7bc03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" BIGSERIAL NOT NULL, "guest_number" character varying NOT NULL, "order_list" jsonb NOT NULL, "total_sum" numeric(10,2) NOT NULL, "order_status_id" integer NOT NULL, "moderator_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hotel_services" ("id" SERIAL NOT NULL, "category_id" integer NOT NULL, "image_url" character varying, "title_ru" character varying NOT NULL, "title_en" character varying NOT NULL, "title_kz" character varying NOT NULL, "description_ru" character varying NOT NULL, "description_en" character varying NOT NULL, "description_kz" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "is_available" boolean NOT NULL, CONSTRAINT "PK_8290f727a21aa3e23c89a944726" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "hotel_services"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "hotel_service_categories"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TABLE "system_settings"`);
    await queryRunner.query(`DROP TABLE "additional_service_categories"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "foods"`);
    await queryRunner.query(`DROP TABLE "sections"`);
    await queryRunner.query(`DROP TABLE "orders_statuses"`);
    await queryRunner.query(`DROP TABLE "food_categories"`);
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "additional_services"`);
    await queryRunner.query(`DROP TABLE "advertising_banners"`);
  }
}
