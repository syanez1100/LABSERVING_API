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
exports.segService = void 0;
const httpStatusCodes_1 = require("../../constants/httpStatusCodes");
const handleError_1 = require("../../helpers/handleError");
const jwt_1 = require("../../helpers/jwt");
const seg_repository_1 = require("./seg.repository");
exports.segService = {
    login: (usuario) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield seg_repository_1.segRepository.usuarioByUsername(usuario);
            delete result[0].estado;
            delete result[0].password;
            const token = yield (0, jwt_1.generarJWT)(result[0].username);
            return token;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    usuario: (usuario) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usuario_new = yield seg_repository_1.segRepository.usuario(usuario);
            return usuario_new;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
    usuarioByUsername: (usuario) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const respuesta = yield seg_repository_1.segRepository.usuarioByUsername(usuario);
            delete respuesta[0].estado;
            delete respuesta[0].password;
            return respuesta;
        }
        catch (ERR) {
            throw new handleError_1.HandleError(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    }),
};
//# sourceMappingURL=seg.services.js.map