import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { IncidenciasTrabajador } from "./IncidenciasTrabajador.entity";
import { HorarioTrabajador } from "./HorarioTrabajador.entity";
import { NivelTrabajador } from "./NivelTrabajador.entity";
import { PosicionTrabajador } from "./PosicionTrabajador.entity";
import { join } from "path";

@Entity({ name: "trabajador" })
export class Trabajador {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => HorarioTrabajador, (horario) => horario.trabajador)
  horario: HorarioTrabajador; //horario del trabajador

  @ManyToOne(() => NivelTrabajador)
  @JoinColumn({ name: "nivelId" })
  nivel: NivelTrabajador; //nivel del trabajador

  @ManyToOne(()=> PosicionTrabajador)
  @JoinColumn({ name: "posicionId" })
  posicion: PosicionTrabajador; //posicion del trabajador

  @Column({ nullable: false })
  disponiblePeriodo1: number; //dias disponibles periodo 1 del año actual

  @Column({ nullable: false })
  disponiblePeriodo2: number; //dias disponibles periodo 2 del año actual

  @Column({ nullable: false })
  disponiblePeriodo1Pasado: number; //dias disponibles periodo 1 del año pasado
  
  @Column({ nullable: false })
  disponiblePeriodo2Pasado: number; //dias disponibles periodo 2 del año pasado

  @Column({ nullable: false })
  disponibleTotal: number; //suma de todos los dias disponibles

  @OneToMany(() => IncidenciasTrabajador, (incidenciasTrabajador) => incidenciasTrabajador.trabajador)
  incidenciasAut: IncidenciasTrabajador[]; // listado de incidencias autorizadas: tipo de incidencia con fechas autorizadas

  @Column({ nullable: false })
  diasVacacionesUsados: number; // suma de todos los dias de vacaciones usados este año

  @Column({ nullable: false })
  diasEconDisponibles: number; // dias economicos que cada trabajador tiene disponibles

  @Column({ nullable: false }) 
  diasEconUsados: number; // dias ecomicos que ya haya usado el trabajador en el año actual

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}