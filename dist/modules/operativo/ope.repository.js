"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.opeRepository = void 0;
const httpStatusCodes_1 = require("../../constants/httpStatusCodes");
const conexion_1 = require("../../db/conexion");
const handleError_1 = require("../../helpers/handleError");
const ope_mapper_1 = require("./ope.mapper");
const db = new conexion_1.ConnectionDB();
exports.opeRepository = {
    clientes: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const connectionDB = yield db.pool.connect();
            const result = yield connectionDB.query('SELECT * FROM ope_tclientes');
            connectionDB.release();
            const clientes = (0, ope_mapper_1.clientesMapper)(result.rows);
            return clientes;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    equipos: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const connectionDB = yield db.pool.connect();
            const result = yield connectionDB.query('SELECT * FROM OPE_TEQUIPOS');
            connectionDB.release();
            const equipos = (0, ope_mapper_1.equiposMapper)(result.rows);
            return equipos;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    equiposByCliente: (cliente) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const connectionDB = yield db.pool.connect();
            const query = {
                text: `
          SELECT DISTINCT EQUN_ID,EQUV_NOMBRE,CLIV_NOMBRE,CLIN_ID
          FROM OPE_TEQUIPOS, OPE_TSERIES, OPE_TCLIENTES
          WHERE SERN_EQUIPO = EQUN_ID AND SERV_CLIENTE = CLIN_ID AND CLIN_ID = $1
        `,
                values: [cliente],
            };
            const result = yield connectionDB.query(query);
            connectionDB.release();
            const equipos = (0, ope_mapper_1.equiposMapper)(result.rows);
            const response = {
                _id: cliente,
                nombre_cliente: ((_a = result.rows[0]) === null || _a === void 0 ? void 0 : _a.cliv_nombre) || 'DEFAULT',
                cantidad: result.rowCount,
                equipos
            };
            return response;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    seriesByEquipoByCliente: (cliente, equipo) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const connectionDB = yield db.pool.connect();
            const query = {
                text: `
        SELECT EQUV_NOMBRE,SERV_ID,CLIV_NOMBRE,CLIN_ID
        FROM OPE_TEQUIPOS,OPE_TSERIES,OPE_TCLIENTES
        WHERE SERN_EQUIPO=EQUN_ID AND SERV_CLIENTE=CLIN_ID AND CLIN_ID=$1 AND EQUN_ID=$2`,
                values: [cliente, equipo],
            };
            const result = yield connectionDB.query(query);
            connectionDB.release();
            const series = (0, ope_mapper_1.seriesMapper)(result.rows);
            const response = {
                _id: cliente,
                nombre_cliente: ((_b = result.rows[0]) === null || _b === void 0 ? void 0 : _b.cliv_nombre) || 'DEFAULT',
                cantidad: result.rowCount,
                series
            };
            return response;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    })
};
//# sourceMappingURL=ope.repository.js.map