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
exports.getSeriesByEquipoByCliente = exports.getEquiposByCliente = exports.getEquipos = exports.getClientes = void 0;
const httpResponses_1 = require("../../helpers/httpResponses");
const catchAsyncErrors_1 = require("../../helpers/catchAsyncErrors");
const ope_serivce_1 = require("./ope.serivce");
const httpResponses = new httpResponses_1.HttpResponses();
exports.getClientes = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ope_serivce_1.opeService.clientes();
    httpResponses.Ok(res, "Clientes obtenidos correctamente.", result);
}));
exports.getEquipos = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ope_serivce_1.opeService.equipos();
    httpResponses.Ok(res, "Equipos obtenidos correctamente.", result);
}));
exports.getEquiposByCliente = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cliente } = req.params;
    const result = yield ope_serivce_1.opeService.equiposByCliente(cliente);
    httpResponses.Ok(res, "Equipos obtenidos correctamente.", result);
}));
exports.getSeriesByEquipoByCliente = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cliente, equipo } = req.params;
    const result = yield ope_serivce_1.opeService.seriesByEquipoByCliente(cliente, equipo);
    httpResponses.Ok(res, "Equipos obtenidos correctamente.", result);
}));
//# sourceMappingURL=ope.controller.js.map