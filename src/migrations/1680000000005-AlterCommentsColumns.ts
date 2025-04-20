import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCommentsColumns1680000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Disabled: migration not needed, handled by force drop & create.
    // await queryRunner.query(`
    //   ALTER TABLE comments RENAME COLUMN authorId TO author_id;
    // `);
    // await queryRunner.query(`
    //   ALTER TABLE comments RENAME COLUMN postId TO post_id;
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Disabled
    // await queryRunner.query(`
    //   ALTER TABLE comments RENAME COLUMN author_id TO authorId;
    // `);
    // await queryRunner.query(`
    //   ALTER TABLE comments RENAME COLUMN post_id TO postId;
    // `);
  }
}
