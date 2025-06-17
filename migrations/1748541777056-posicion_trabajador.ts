import { MigrationInterface, QueryRunner } from "typeorm";

export class posicionTrabajador1748541777056 implements MigrationInterface {
  name = 'posicionTrabajador1748541777056'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE posicion_trabajador (
        posicionId VARCHAR(36) NOT NULL PRIMARY KEY,
        posicion VARCHAR(255) NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE posicion_trabajador`);
  }
}
