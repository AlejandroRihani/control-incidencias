import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "nivel_trabajador" })
export class NivelTrabajador {

    @PrimaryGeneratedColumn("uuid")
    nivelId: string;

    @Column({ nullable: false })
    nivel: string; //nombre del nivel (ej: administrativo, tecnico, etc)
}