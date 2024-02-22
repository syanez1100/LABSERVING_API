"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ope_controller_1 = require("./ope.controller");
const opeRouter = (0, express_1.Router)();
opeRouter.get('/clientes', ope_controller_1.getClientes);
opeRouter.get('/equipos', ope_controller_1.getEquipos);
opeRouter.get('/equipos/:cliente', ope_controller_1.getEquiposByCliente);
opeRouter.get('/series/:cliente/:equipo', ope_controller_1.getSeriesByEquipoByCliente);
exports.default = opeRouter;
//# sourceMappingURL=ope.routes.js.map