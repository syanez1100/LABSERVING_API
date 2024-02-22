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
exports.getUsuario = exports.postUsuario = void 0;
const catchAsyncErrors_1 = require("../../helpers/catchAsyncErrors");
const httpResponses_1 = require("../../helpers/httpResponses");
const seg_services_1 = require("./seg.services");
const httpResponses = new httpResponses_1.HttpResponses();
exports.postUsuario = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.body;
    const result = yield seg_services_1.segService.usuario(usuario);
    httpResponses.Ok(res, "Usuario creado correctamente.", result);
}));
exports.getUsuario = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const result = yield seg_services_1.segService.usuarioByUsername(username);
    httpResponses.Ok(res, "Usuario obtenido correctamente.", result);
}));
//# sourceMappingURL=seg.controller.js.map