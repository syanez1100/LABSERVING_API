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
exports.opeService = void 0;
const httpStatusCodes_1 = require("../../constants/httpStatusCodes");
const handleError_1 = require("../../helpers/handleError");
const ope_repository_1 = require("./ope.repository");
exports.opeService = {
    clientes: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const modalidades = yield ope_repository_1.opeRepository.clientes();
            return modalidades;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    equipos: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const equipos = yield ope_repository_1.opeRepository.equipos();
            return equipos;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    equiposByCliente: (cliente) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const equipos = yield ope_repository_1.opeRepository.equiposByCliente(cliente);
            return equipos;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    seriesByEquipoByCliente: (cliente, equipo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const equipos = yield ope_repository_1.opeRepository.seriesByEquipoByCliente(cliente, equipo);
            return equipos;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
};
//# sourceMappingURL=ope.serivce.js.map