import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTagsAndPostTags1745141749287 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tags" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) UNIQUE NOT NULL
            );
        `);
        await queryRunner.query(`
            CREATE TABLE "post_tags" (
                "postId" integer NOT NULL,
                "tagId" integer NOT NULL,
                CONSTRAINT "PK_post_tags" PRIMARY KEY ("postId", "tagId"),
                CONSTRAINT "FK_post_tags_post" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_post_tags_tag" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS "post_tags" CASCADE;');
        await queryRunner.query('DROP TABLE IF EXISTS "tags" CASCADE;');
    }

}
