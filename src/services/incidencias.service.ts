import { Between } from "typeorm";
import AppDataSource from "../data-source";
import { IncidenciasTrabajador } from "../entity/IncidenciasTrabajador.entity";
import { Trabajador } from "../entity/Trabajador.entity";

export class IncidenciaService {
  static async registrarVacacion(data: any, forzarGuardado = false) {
    const repo = AppDataSource.getRepository(IncidenciasTrabajador);
    const trabajadorRepo = AppDataSource.getRepository(Trabajador);

    const trabajador = await trabajadorRepo.findOne({
      where: { id: data.trabajadorId },
      relations: ['horario', 'nivel', 'posicion', 'incidenciasAut'],
    });

    if (!trabajador) throw { status: 404, message: 'Trabajador no encontrado.' };

    const errores: string[] = [];
    const advertencias: string[] = [];

    const fechaInicio = new Date(data.fechaInicio);
    const fechaFin = new Date(data.fechaFin);

    // Ejecutar reglas
    await this.validarHorario(trabajador, fechaInicio, fechaFin, errores);
    await this.validarNivel(trabajador, fechaInicio, fechaFin, errores);
    await this.validarPosicion(trabajador, fechaInicio, fechaFin, errores);
    this.validarPeriodo(trabajador, fechaInicio, fechaFin, errores, advertencias);

    if (errores.length > 0) {
      throw { status: 400, message: 'Reglas violadas', detalles: errores };
    }

    if (advertencias.length > 0 && !forzarGuardado) {
      throw { status: 409, message: 'Advertencias encontradas', advertencias };
    }

    // Guardado si todo pasa
    const incidencia = repo.create({ ...data, trabajador });
    await repo.save(incidencia);

    return incidencia;
  }

  static async validarHorario(trabajador, inicio, fin, errores) {
    const repo = AppDataSource.getRepository(IncidenciasTrabajador);
    const trabajadoresConIncidencia = await repo.find({
      where: [
        { fechaInicio: Between(inicio, fin) },
        { fechaFin: Between(inicio, fin) },
      ],
      relations: ['trabajador', 'trabajador.horario'],
    });

    for (const incidencia of trabajadoresConIncidencia) {
      const h = incidencia.trabajador.horario;
      if (trabajador.horario.sabado && h.sabado) {
        errores.push('Ya hay un trabajador con horario sábado de vacaciones en ese rango.');
        break;
      }
      if (trabajador.horario.domingo && h.domingo) {
        errores.push('Ya hay un trabajador con horario domingo de vacaciones en ese rango.');
        break;
      }
    }
  }

  static async validarNivel(trabajador, inicio, fin, errores) {
    if (trabajador.nivel.nivel.toLowerCase() !== 'jefe') return;

    const repo = AppDataSource.getRepository(IncidenciasTrabajador);
    const otrosJefes = await repo.find({
      where: [
        { fechaInicio: Between(inicio, fin) },
        { fechaFin: Between(inicio, fin) },
      ],
      relations: ['trabajador', 'trabajador.nivel'],
    });

    const hayOtroJefe = otrosJefes.some(
      (i) => i.trabajador.id !== trabajador.id && i.trabajador.nivel.nivel.toLowerCase() === 'jefe'
    );

    if (hayOtroJefe) errores.push('Ya hay otro jefe en vacaciones en ese rango.');
  }

  static async validarPosicion(trabajador, inicio, fin, errores) {
    const repo = AppDataSource.getRepository(IncidenciasTrabajador);
    const mismasPosiciones = await repo.find({
      where: [
        { fechaInicio: Between(inicio, fin) },
        { fechaFin: Between(inicio, fin) },
      ],
      relations: ['trabajador', 'trabajador.posicion'],
    });

    const otroMismaPosicion = mismasPosiciones.some(
      (i) => i.trabajador.id !== trabajador.id && i.trabajador.posicion.posicion === trabajador.posicion.posicion
    );

    if (otroMismaPosicion) errores.push('Ya hay otro trabajador con la misma posición en vacaciones.');
  }

  static validarPeriodo(trabajador, inicio, fin, errores: string[], advertencias: string[]) {
    const añoActual = new Date().getFullYear();
    const mesInicio = inicio.getMonth() + 1;
    const periodo = mesInicio <= 6 ? 1 : 2;

    // Mezcla de periodos
    const mesFin = fin.getMonth() + 1;
    const periodoFin = mesFin <= 6 ? 1 : 2;

    if (periodo !== periodoFin) {
      advertencias.push('Estás solicitando vacaciones que cruzan dos periodos diferentes.');
    }

    // Vencimiento del periodo pasado
    if (
      periodo === 1 &&
      trabajador.disponiblePeriodo1Pasado > 0 &&
      inicio > new Date(`${añoActual}-06-30`)
    ) {
      errores.push('Días del 1er periodo del año pasado ya no están vigentes.');
    }

    if (
      periodo === 2 &&
      trabajador.disponiblePeriodo2Pasado > 0 &&
      inicio > new Date(`${añoActual}-12-31`)
    ) {
      errores.push('Días del 2do periodo del año pasado ya no están vigentes.');
    }
  }
}
