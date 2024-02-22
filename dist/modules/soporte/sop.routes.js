"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sop_controller_1 = require("./sop.controller");
const sopRouter = (0, express_1.Router)();
sopRouter.post('/cliente', sop_controller_1.postCliente);
sopRouter.post('/equipo', sop_controller_1.postEquipo);
sopRouter.post('/serie', sop_controller_1.postSerie);
exports.default = sopRouter;
//# sourceMappingURL=sop.routes.js.map