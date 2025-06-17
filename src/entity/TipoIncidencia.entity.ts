import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "tipo_incidencia" })
export class TipoIncidencia {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    tipoIncidencia: string; //tipo de incidencia (vacaciones, economicos, etc)

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

