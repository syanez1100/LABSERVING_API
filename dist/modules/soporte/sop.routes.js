"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sop_controller_1 = require("./sop.controller");
const autenticacion_middleware_1 = require("../../middlewares/autenticacion.middleware");
const sopRouter = (0, express_1.Router)();
sopRouter.post('/cliente', [autenticacion_middleware_1.usuarioAutenticado], sop_controller_1.postCliente);
sopRouter.post('/equipo', [autenticacion_middleware_1.usuarioAutenticado], sop_controller_1.postEquipo);
sopRouter.post('/serie', [autenticacion_middleware_1.usuarioAutenticado], sop_controller_1.postSerie);
exports.default = sopRouter;
//# sourceMappingURL=sop.routes.js.map