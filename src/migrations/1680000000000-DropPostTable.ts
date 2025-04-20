import { MigrationInterface, QueryRunner } from "typeorm";

export class DropPostTable1680000000000 implements MigrationInterface {
    name = 'DropPostTable1680000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "post" CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
    }
}
