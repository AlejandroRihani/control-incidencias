// src/entity/ConfiguracionSistema.entity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'configuracion_sistema' })
export class ConfiguracionSistema {
  @PrimaryColumn()
  clave: string;

  @Column()
  valor: string;
}
