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
exports.sopService = void 0;
const httpStatusCodes_1 = require("../../constants/httpStatusCodes");
const handleError_1 = require("../../helpers/handleError");
const sop_repository_1 = require("./sop.repository");
exports.sopService = {
    cliente: (nombre) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cliente = yield sop_repository_1.sopRepository.cliente(nombre);
            return cliente;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    equipo: (nombre) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const equipo = yield sop_repository_1.sopRepository.equipo(nombre);
            return equipo;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    serie: (cliente, equipo, serie_equipo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const serie = yield sop_repository_1.sopRepository.serie(cliente, equipo, serie_equipo);
            return serie;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
};
//# sourceMappingURL=sop.services.js.map