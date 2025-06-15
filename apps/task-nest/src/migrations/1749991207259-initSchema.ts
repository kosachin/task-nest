import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1749991207259 implements MigrationInterface {
    name = 'InitSchema1749991207259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "addressLine1" character varying NOT NULL, "addressLine2" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "postalCode" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "countryCode" character varying(5) NOT NULL, "phoneNumber" character varying(15) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'CUSTOMER', "email" character varying(255), "defaultProfileId" uuid, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5cb78e99c8ec82b3d0588e4d4d" ON "users" ("countryCode", "phoneNumber") `);
        await queryRunner.query(`CREATE TABLE "session_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_897bc09b92e1a7ef6b30cba4786" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "UQ_7dadebaed69653520aa93bbc84d" UNIQUE ("name"), CONSTRAINT "PK_1dc93417a097cdee3491f39d7cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "catalogues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "UQ_4078c8032bac6d759d30a2ec54f" UNIQUE ("name"), CONSTRAINT "PK_46bf45bf62531f148dc7b5cf5ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "iconUrl" character varying, "catalogueId" uuid, CONSTRAINT "UQ_9c82ec8e7aeebffb32f79b57591" UNIQUE ("name"), CONSTRAINT "PK_b69a5a32117f62f4eafe80b5220" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "mainCategoryId" uuid, CONSTRAINT "PK_f319b046685c0e07287e76c5ab1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "description" text NOT NULL, "durationMinutes" integer, "isActive" boolean NOT NULL DEFAULT true, "subCategoryId" uuid, "serviceTypeId" uuid, CONSTRAINT "PK_7383c18e3c8e4956860b117728a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_25b35c36fa5ba0b2cf3ad124931" FOREIGN KEY ("defaultProfileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main_categories" ADD CONSTRAINT "FK_b0349a1e9042e7253a9c1e946ec" FOREIGN KEY ("catalogueId") REFERENCES "catalogues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_categories" ADD CONSTRAINT "FK_acba6eee704e3352be4f53ac523" FOREIGN KEY ("mainCategoryId") REFERENCES "main_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_items" ADD CONSTRAINT "FK_f1f4d638523e089332baf4c1c89" FOREIGN KEY ("subCategoryId") REFERENCES "sub_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_items" ADD CONSTRAINT "FK_d7ce10f3352b3fd46d203c46090" FOREIGN KEY ("serviceTypeId") REFERENCES "service_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_items" DROP CONSTRAINT "FK_d7ce10f3352b3fd46d203c46090"`);
        await queryRunner.query(`ALTER TABLE "service_items" DROP CONSTRAINT "FK_f1f4d638523e089332baf4c1c89"`);
        await queryRunner.query(`ALTER TABLE "sub_categories" DROP CONSTRAINT "FK_acba6eee704e3352be4f53ac523"`);
        await queryRunner.query(`ALTER TABLE "main_categories" DROP CONSTRAINT "FK_b0349a1e9042e7253a9c1e946ec"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_25b35c36fa5ba0b2cf3ad124931"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985"`);
        await queryRunner.query(`DROP TABLE "service_items"`);
        await queryRunner.query(`DROP TABLE "sub_categories"`);
        await queryRunner.query(`DROP TABLE "main_categories"`);
        await queryRunner.query(`DROP TABLE "catalogues"`);
        await queryRunner.query(`DROP TABLE "service_types"`);
        await queryRunner.query(`DROP TABLE "session_entity"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5cb78e99c8ec82b3d0588e4d4d"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
    }

}
