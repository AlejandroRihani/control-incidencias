import { MigrationInterface, QueryRunner } from "typeorm";

export class incidencia1748541756116 implements MigrationInterface {
  name = 'incidencia1748541756116'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE incidencias_trabajador (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        trabajadorId VARCHAR(36),
        tipoIncidenciaId VARCHAR(36),
        fechaInicio DATETIME NOT NULL,
        fechaFin DATETIME NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_incidencia_trabajador FOREIGN KEY (trabajadorId) REFERENCES trabajador(id),
        CONSTRAINT FK_tipo_incidencia FOREIGN KEY (tipoIncidenciaId) REFERENCES tipo_incidencia(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE incidencias_trabajador`);
  }
}
