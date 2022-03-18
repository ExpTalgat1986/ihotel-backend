import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAndRoleEntity1647626152713 implements MigrationInterface {
  name = 'CreateUserAndRoleEntity1647626152713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "iin" character varying(12) NOT NULL, "password" character varying NOT NULL, "role_id" integer NOT NULL DEFAULT '1', "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone_number" character varying(12) NOT NULL, CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
