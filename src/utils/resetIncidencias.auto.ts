// src/utils/resetVacaciones.auto.ts
import AppDataSource from "../data-source";
import { Trabajador } from '../entity/Trabajador.entity';
import { ConfiguracionSistema } from '../entity/config_sistema.entity';

/**
 * Revisa si es 1 de enero y si el sistema ya hizo el reset de vacaciones este año.
 * Si no lo ha hecho, actualiza los campos de días disponibles en los trabajadores
 * y guarda el año del último reset en la tabla de configuración.
 */

export async function checarResetVacacionesSiEsNecesario() {
  const configRepo = AppDataSource.getRepository(ConfiguracionSistema);
  const trabajadoresRepo = AppDataSource.getRepository(Trabajador);

  const hoy = new Date();
  const añoActual = hoy.getFullYear();
  const es1DeEnero = hoy.getMonth() === 0 && hoy.getDate() === 1;

  if (!es1DeEnero) return; // Solo ejecutar el 1 de enero

  const ultima = await configRepo.findOneBy({ clave: 'ultimoResetVacaciones' });

  if (ultima?.valor === `${añoActual}`) return; // Ya se ejecutó este año

  // Hacer el reset
  const trabajadores = await trabajadoresRepo.find();
  for (const t of trabajadores) {
    t.disponiblePeriodo1Pasado = Math.min(t.disponiblePeriodo1, 10);
    t.disponiblePeriodo2Pasado = Math.min(t.disponiblePeriodo2, 10);
    t.disponiblePeriodo1 = 10;
    t.disponiblePeriodo2 = 10;
    t.disponibleTotal =
      t.disponiblePeriodo1 +
      t.disponiblePeriodo2 +
      t.disponiblePeriodo1Pasado +
      t.disponiblePeriodo2Pasado;
    await trabajadoresRepo.save(t);
  }

  // Registrar el reset
  if (ultima) {
    ultima.valor = `${añoActual}`;
    await configRepo.save(ultima);
  } else {
    await configRepo.insert({ clave: 'ultimoResetVacaciones', valor: `${añoActual}` });
  }

  console.log('✅ Reset anual de vacaciones ejecutado.');
}
