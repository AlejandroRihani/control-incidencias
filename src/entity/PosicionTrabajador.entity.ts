import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "posicion_trabajador" })
export class PosicionTrabajador {

    @PrimaryGeneratedColumn("uuid")
    posicionId: string;

    @Column({ nullable: false })
    posicion: string; 
    //nombre de la posicion (jefe departamento, informes, ventanillas, dictaminación, coordinación, correcciones)
}