"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ope_controller_1 = require("./ope.controller");
const autenticacion_middleware_1 = require("../../middlewares/autenticacion.middleware");
const opeRouter = (0, express_1.Router)();
opeRouter.get('/clientes', [autenticacion_middleware_1.usuarioAutenticado], ope_controller_1.getClientes);
opeRouter.get('/equipos', [autenticacion_middleware_1.usuarioAutenticado], ope_controller_1.getEquipos);
opeRouter.get('/equipos/:cliente', [autenticacion_middleware_1.usuarioAutenticado], ope_controller_1.getEquiposByCliente);
opeRouter.get('/series/:cliente/:equipo', [autenticacion_middleware_1.usuarioAutenticado], ope_controller_1.getSeriesByEquipoByCliente);
exports.default = opeRouter;
//# sourceMappingURL=ope.routes.js.map