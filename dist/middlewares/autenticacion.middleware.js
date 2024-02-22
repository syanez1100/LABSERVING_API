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
exports.getGlobalUsername = exports.tokenValido = exports.usuarioAutenticado = exports.metodoAutenticacion = exports.usuarioActivo = void 0;
const catchAsyncErrors_1 = require("../helpers/catchAsyncErrors");
const seg_repository_1 = require("../modules/seguridad/seg.repository");
const handleError_1 = require("../helpers/handleError");
const httpResponses_1 = require("../helpers/httpResponses");
const passport_middleware_1 = __importDefault(require("./passport.middleware"));
const jwt_1 = require("../helpers/jwt");
let globalUsername;
const httpResponses = new httpResponses_1.HttpResponses();
exports.usuarioActivo = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const user = yield seg_repository_1.segRepository.usuarioByUsername(username);
    if (user.length == 0)
        throw new handleError_1.HandleError(401, 'El usuario no se encuentra registrado.');
    const estado = user[0].estado;
    if (estado !== 'ACTIVO')
        throw new handleError_1.HandleError(401, 'No estás autorizado para acceder a este recurso.');
    next();
}));
exports.metodoAutenticacion = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const user = yield seg_repository_1.segRepository.usuarioByUsername(username);
    if (user.length == 0)
        throw new handleError_1.HandleError(401, 'No estás autorizado para acceder a este recurso.');
    passport_middleware_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return httpResponses.Unauthorized(res, info.message);
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return next();
        });
    })(req, res, next);
}));
exports.usuarioAutenticado = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token_key = (_b = (_a = req.header('token_key')) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
    if (!token_key)
        throw new handleError_1.HandleError(401, 'No estás autorizado para acceder a este recurso.');
    const decoded = yield (0, jwt_1.validarJWT)(token_key);
    const { _json, uid, username } = decoded;
    const _documento = (_json) ? _json.sAMAccountName.toUpperCase() : uid;
    const user = (_json) ? _json.sAMAccountName.toUpperCase() : username;
    const usuario = yield seg_repository_1.segRepository.usuarioByUsername(user);
    if (usuario.length == 0)
        throw new handleError_1.HandleError(401, 'No estás autorizado para acceder a este recurso.');
    globalUsername = username;
    req.userSession = username;
    next();
}));
exports.tokenValido = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const token_key = (_d = (_c = req.header('token_key')) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '';
    if (!token_key)
        throw new handleError_1.HandleError(401, 'No estás autorizado para acceder a este recurso.');
    const decoded = yield (0, jwt_1.validarJWT)(token_key);
    const { _json, username } = decoded;
    const user = (_json) ? _json.sAMAccountName.toUpperCase() : username;
    const usuario = yield seg_repository_1.segRepository.usuarioByUsername(user);
    if (usuario.length == 0)
        throw new handleError_1.HandleError(401, 'No estás autorizado para acceder a este recurso.');
    delete usuario[0].estado;
    delete usuario[0].password;
    const respuesta = {
        usuario,
        token_key
    };
    return httpResponses.Ok(res, 'Token Valido', respuesta);
}));
function getGlobalUsername(req) {
    return req.userSession;
    ;
}
exports.getGlobalUsername = getGlobalUsername;
//# sourceMappingURL=autenticacion.middleware.js.map