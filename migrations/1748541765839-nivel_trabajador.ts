import { MigrationInterface, QueryRunner } from "typeorm";

export class nivelTrabajador1748541765839 implements MigrationInterface {
  name = 'nivelTrabajador1748541765839'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE nivel_trabajador (
        nivelId VARCHAR(36) NOT NULL PRIMARY KEY,
        nivel VARCHAR(255) NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE nivel_trabajador`);
  }
}
