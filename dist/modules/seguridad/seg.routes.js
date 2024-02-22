"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seg_controller_1 = require("./seg.controller");
const autenticacion_middleware_1 = require("../../middlewares/autenticacion.middleware");
const segRouter = (0, express_1.Router)();
segRouter.get('/login', [autenticacion_middleware_1.usuarioActivo, autenticacion_middleware_1.metodoAutenticacion], seg_controller_1.login);
segRouter.post('/usuario', [autenticacion_middleware_1.usuarioAutenticado], seg_controller_1.postUsuario);
segRouter.get('/usuario', [autenticacion_middleware_1.usuarioAutenticado], seg_controller_1.getUsuario);
segRouter.get('/check', [autenticacion_middleware_1.tokenValido]);
exports.default = segRouter;
//# sourceMappingURL=seg.routes.js.map