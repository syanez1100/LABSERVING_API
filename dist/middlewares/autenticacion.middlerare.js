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
exports.metodoAutenticacion = exports.usuarioActivo = void 0;
const catchAsyncErrors_1 = require("../helpers/catchAsyncErrors");
const seg_repository_1 = require("../modules/seguridad/seg.repository");
const handleError_1 = require("../helpers/handleError");
const httpResponses_1 = require("../helpers/httpResponses");
const passport_middleware_1 = __importDefault(require("./passport.middleware"));
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
    // const metodo = user[0].USUV_MET_AUTH;
    // if (metodo === 'LOCAL'){
    //     passport.authenticate('local', (err: any, user: any, info: any) => {
    //         if (err) {
    //           return next(err);
    //         }
    //         if (!user) {
    //             return httpResponses.Unauthorized(res,info.message);
    //         }
    //         req.login(user, (err) => {
    //           if (err) {
    //             return next(err);
    //           }
    //           return next();
    //         });
    //       })(req, res, next);
    // } else if(metodo === 'LDAP') {
    //     console.log('se va por directorio');
    // }else {
    //     throw new HandleError(401,'No estás autorizado para acceder a este recurso.');
    // }
}));
//# sourceMappingURL=autenticacion.middlerare.js.map