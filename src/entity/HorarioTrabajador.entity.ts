import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Trabajador } from "./Trabajador.entity";

@Entity({ name: "horario_trabajador" })
export class HorarioTrabajador {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Trabajador, (trabajador) => trabajador.horario, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "trabajador_id" })
  trabajador: Trabajador;
 
  //se marca verdadero si el trabajador trabaja ese dia y falso si no
  @Column({ nullable: false })
  lunes: boolean;

  @Column({ nullable: false })
  martes: boolean;

  @Column({ nullable: false })
  miercoles: boolean;

  @Column({ nullable: false })
  jueves: boolean;

  @Column({ nullable: false })
  viernes: boolean;

  @Column({ nullable: false })
  sabado: boolean;

  @Column({ nullable: false })
  domingo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
