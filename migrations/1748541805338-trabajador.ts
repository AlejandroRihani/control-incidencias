import { MigrationInterface, QueryRunner } from "typeorm";

export class trabajador1748541805338 implements MigrationInterface {
  name = 'trabajador1748541805338'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE trabajador (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        nivelId VARCHAR(36),
        posicionId VARCHAR(36),
        disponiblePeriodo1 INT NOT NULL,
        disponiblePeriodo2 INT NOT NULL,
        disponiblePeriodo1Pasado INT NOT NULL,
        disponiblePeriodo2Pasado INT NOT NULL,
        disponibleTotal INT NOT NULL,
        diasVacacionesUsados INT NOT NULL,
        diasEconDisponibles INT NOT NULL,
        diasEconUsados INT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_trabajador_nivel FOREIGN KEY (nivelId) REFERENCES nivel_trabajador(nivelId),
        CONSTRAINT FK_trabajador_posicion FOREIGN KEY (posicionId) REFERENCES posicion_trabajador(posicionId)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE trabajador`);
  }
}
