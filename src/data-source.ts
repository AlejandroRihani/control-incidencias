import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './entity/User.entity';
import { HorarioTrabajador } from './entity/HorarioTrabajador.entity';
import { IncidenciasTrabajador } from './entity/IncidenciasTrabajador.entity';
import { NivelTrabajador } from './entity/NivelTrabajador.entity';
import { PosicionTrabajador } from './entity/PosicionTrabajador.entity';
import { TipoIncidencia } from './entity/TipoIncidencia.entity';
import { Trabajador } from './entity/Trabajador.entity';
import { ConfiguracionSistema } from './entity/config_sistema.entity'; 

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env;

const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    User,
    HorarioTrabajador,
    IncidenciasTrabajador,
    NivelTrabajador,
    PosicionTrabajador,
    TipoIncidencia,
    Trabajador,
    ConfiguracionSistema, 
  ],
  migrations: ['migrations/*.ts'],
  subscribers: [],
});

export default AppDataSource;
