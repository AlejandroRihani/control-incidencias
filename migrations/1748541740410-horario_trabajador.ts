import { MigrationInterface, QueryRunner } from "typeorm";

export class horarioTrabajador1748541740410 implements MigrationInterface {
  name = 'horarioTrabajador1748541740410'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE horario_trabajador (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        trabajador_id VARCHAR(36),
        lunes BOOLEAN NOT NULL,
        martes BOOLEAN NOT NULL,
        miercoles BOOLEAN NOT NULL,
        jueves BOOLEAN NOT NULL,
        viernes BOOLEAN NOT NULL,
        sabado BOOLEAN NOT NULL,
        domingo BOOLEAN NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_horario_trabajador FOREIGN KEY (trabajador_id) REFERENCES trabajador(id) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE horario_trabajador`);
  }
}
