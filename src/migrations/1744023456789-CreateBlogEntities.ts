import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBlogEntities1744023456789 implements MigrationInterface {
    name = 'CreateBlogEntities1744023456789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "category" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "createdAt" TIMESTAMP DEFAULT now(),
                "updatedAt" TIMESTAMP DEFAULT now()
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "post" (
                "id" SERIAL PRIMARY KEY,
                "title" VARCHAR(255) NOT NULL,
                "content" TEXT NOT NULL,
                "imageUrl" VARCHAR(255),
                "userId" INTEGER,
                "categoryId" INTEGER,
                "createdAt" TIMESTAMP DEFAULT now(),
                "updatedAt" TIMESTAMP DEFAULT now(),
                FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL,
                FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" SERIAL PRIMARY KEY,
                "content" TEXT NOT NULL,
                "userId" INTEGER,
                "postId" INTEGER,
                "createdAt" TIMESTAMP DEFAULT now(),
                "updatedAt" TIMESTAMP DEFAULT now(),
                FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL,
                FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "comment"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "post"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "category"`);
    }
}
