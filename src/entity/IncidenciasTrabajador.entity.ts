import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Trabajador } from "./Trabajador.entity";
import { TipoIncidencia }  from "./TipoIncidencia.entity";

@Entity({ name: "incidencias_trabajador" })
export class IncidenciasTrabajador {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.incidenciasAut)
  trabajador: Trabajador;

  @ManyToOne(() => TipoIncidencia)
  @JoinColumn({ name: "tipoIncidenciaID" })
  tipoIncidencia: TipoIncidencia;

  @Column({ nullable: false })
  fechaInicio: Date;

  @Column({ nullable: false })
  fechaFin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
