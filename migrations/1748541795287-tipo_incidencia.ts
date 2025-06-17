import { MigrationInterface, QueryRunner } from "typeorm";

export class tipoIncidencia1748541795287 implements MigrationInterface {
  name = 'tipoIncidencia1748541795287'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE tipo_incidencia (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        tipoIncidencia VARCHAR(255) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tipo_incidencia`);
  }
}
