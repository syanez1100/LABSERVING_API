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
exports.postSerie = exports.postEquipo = exports.postCliente = void 0;
const catchAsyncErrors_1 = require("../../helpers/catchAsyncErrors");
const httpResponses_1 = require("../../helpers/httpResponses");
const sop_services_1 = require("./sop.services");
const httpResponses = new httpResponses_1.HttpResponses();
exports.postCliente = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    const result = yield sop_services_1.sopService.cliente(nombre);
    httpResponses.Ok(res, "Cliente creado correctamente.", result);
}));
exports.postEquipo = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    const result = yield sop_services_1.sopService.equipo(nombre);
    httpResponses.Ok(res, "Equipo creado correctamente.", result);
}));
exports.postSerie = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cliente, equipo, serie_equipo } = req.body;
    const result = yield sop_services_1.sopService.serie(cliente, equipo, serie_equipo);
    httpResponses.Ok(res, "Serie creada correctamente.", result);
}));
//# sourceMappingURL=sop.controller.js.map