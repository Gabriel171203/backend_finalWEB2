import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRoleAndDefaults1680000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user',
      ALTER COLUMN profile_picture SET DEFAULT '',
      ALTER COLUMN bio SET DEFAULT ''
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      DROP COLUMN IF EXISTS role,
      ALTER COLUMN profile_picture DROP DEFAULT,
      ALTER COLUMN bio DROP DEFAULT
    `);
  }
}
