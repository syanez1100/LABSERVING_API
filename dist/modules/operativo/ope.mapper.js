"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seriesMapper = exports.equiposMapper = exports.clientesMapper = void 0;
function clientesMapper(clientes) {
    if (!clientes || clientes.length === 0) {
        return [];
    }
    return clientes.map(cliente => ({
        _id: cliente.clin_id,
        nombre: cliente.cliv_nombre
    }));
}
exports.clientesMapper = clientesMapper;
function equiposMapper(equipos) {
    if (!equipos || equipos.length === 0) {
        return [];
    }
    return equipos.map(equipo => ({
        _id: equipo.equn_id,
        nombre: equipo.equv_nombre
    }));
}
exports.equiposMapper = equiposMapper;
function seriesMapper(series) {
    if (!series || series.length === 0) {
        return [];
    }
    return series.map(serie => ({
        _id: serie.serv_id
    }));
}
exports.seriesMapper = seriesMapper;
//# sourceMappingURL=ope.mapper.js.map