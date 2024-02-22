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
exports.sopRepository = void 0;
const conexion_1 = require("../../db/conexion");
const httpStatusCodes_1 = require("../../constants/httpStatusCodes");
const handleError_1 = require("../../helpers/handleError");
const db = new conexion_1.ConnectionDB();
exports.sopRepository = {
    cliente: (nombre) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const connectionDB = yield db.pool.connect();
            const query = {
                text: `
            INSERT INTO OPE_TCLIENTES (CLIV_NOMBRE) VALUES ($1) RETURNING CLIN_ID
            `,
                values: [nombre],
            };
            const result = yield connectionDB.query(query);
            yield connectionDB.query('COMMIT');
            connectionDB.release();
            const respuesta = {
                _id: result.rows[0].clin_id,
                nombre: nombre
            };
            return respuesta;
        }
        catch (ERR) {
            if (ERR.code == 23505) {
                throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, 'Este cliente ya se encuentra registrado.');
            }
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    equipo: (nombre) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const connectionDB = yield db.pool.connect();
            const query = {
                text: `
            INSERT INTO OPE_TEQUIPOS (EQUV_NOMBRE) VALUES ($1) RETURNING EQUN_ID
            `,
                values: [nombre],
            };
            const result = yield connectionDB.query(query);
            yield connectionDB.query('COMMIT');
            connectionDB.release();
            const respuesta = {
                _id: result.rows[0].equn_id,
                nombre: nombre
            };
            return respuesta;
        }
        catch (ERR) {
            if (ERR.code == 23505) {
                throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, 'Este equipo ya se encuentra registrado.');
            }
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    serie: (cliente, equipo, serie_equipo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const connectionDB = yield db.pool.connect();
            const query = {
                text: `
            INSERT INTO OPE_TSERIES (SERV_ID,SERN_EQUIPO,SERV_CLIENTE) VALUES ($1,$2,$3);
            `,
                values: [serie_equipo, equipo, cliente],
            };
            const result = yield connectionDB.query(query);
            yield connectionDB.query('COMMIT');
            connectionDB.release();
            const respuesta = {
                _serie: serie_equipo
            };
            return respuesta;
        }
        catch (ERR) {
            console.log(ERR);
            if (ERR.code == 23505) {
                throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, 'Esta serie ya se encuentra registrada.');
            }
            if (ERR.code == 23503) {
                throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, `Se esta violando una restricción: ${ERR.constraint}`);
            }
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
};
//# sourceMappingURL=sop.repository.js.map