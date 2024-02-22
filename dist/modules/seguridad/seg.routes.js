"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seg_controller_1 = require("./seg.controller");
const segRouter = (0, express_1.Router)();
segRouter.post('/usuario', seg_controller_1.postUsuario);
segRouter.get('/usuario', seg_controller_1.getUsuario);
exports.default = segRouter;
//# sourceMappingURL=seg.routes.js.map