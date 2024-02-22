import { Cliente, Equipo, Serie } from "../../interfaces/ope.interface";

export function clientesMapper( clientes: any[] | undefined ): Cliente[] {
    if (!clientes || clientes.length === 0) {
      return [];
    }
    return clientes.map(cliente => ({
        _id: cliente.clin_id,
        nombre: cliente.cliv_nombre
      }));
}

export function equiposMapper( equipos: any[] | undefined ): Equipo[] {
    if (!equipos || equipos.length === 0) {
      return [];
    }
    return equipos.map(equipo => ({
        _id: equipo.equn_id,
        nombre: equipo.equv_nombre
      }));
}

export function seriesMapper( series: any[] | undefined ): Serie[] {
    if (!series || series.length === 0) {
      return [];
    }
    return series.map(serie => ({
        _id: serie.serv_id
      }));
}