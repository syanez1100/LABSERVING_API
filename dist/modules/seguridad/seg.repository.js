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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.segRepository = void 0;
const conexion_1 = require("../../db/conexion");
const handleError_1 = require("../../helpers/handleError");
const httpStatusCodes_1 = require("../../constants/httpStatusCodes");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seg_mapper_1 = require("./seg.mapper");
const db = new conexion_1.ConnectionDB();
exports.segRepository = {
    usuario: (usuario) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let { username, nombre, apellido, password, correo, roles } = usuario;
            const salt = bcryptjs_1.default.genSaltSync();
            password = bcryptjs_1.default.hashSync(password, salt);
            username = username.toUpperCase();
            nombre = nombre.toUpperCase();
            apellido = apellido.toUpperCase();
            const connectionDB = yield db.pool.connect();
            const query = {
                text: `
            INSERT INTO SEG_TUSUARIOS (USUV_USERNAME,USUV_NOMBRE,USUV_PASSWORD,USUV_APELLIDO,USUV_CORREO,USUV_ROLES) 
            VALUES ($1,$2,$3,$4,$5,$6)
            `,
                values: [username, nombre, password, apellido, correo, roles],
            };
            yield connectionDB.query(query);
            yield connectionDB.query('COMMIT');
            connectionDB.release();
            const respuesta = {
                username,
                nombre,
                apellido,
                correo
            };
            return respuesta;
        }
        catch (ERR) {
            if (ERR.code == 23505) {
                throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, 'Este usuario ya se encuentra registrado.');
            }
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    usuarioByUsername: (username) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const connectionDB = yield db.pool.connect();
            const query = {
                text: `
            SELECT USUN_ID,USUV_USERNAME,USUV_NOMBRE,USUV_APELLIDO,USUV_CORREO,USUV_ROLES 
            FROM SEG_TUSUARIOS 
            WHERE USUV_USERNAME = $1
            `,
                values: [username],
            };
            const result = yield connectionDB.query(query);
            connectionDB.release();
            const usuario = (0, seg_mapper_1.usuarioMapper)(result.rows);
            return usuario;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    usuarioExiste: (username) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const connectionDB = yield db.pool.connect();
            const query = {
                text: `
            SELECT USUN_ID 
            FROM SEG_TUSUARIOS 
            WHERE USUV_USERNAME = $1
            `,
                values: [username],
            };
            const result = yield connectionDB.query(query);
            connectionDB.release();
            return result.rows.length;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
};
//# sourceMappingURL=seg.repository.js.map