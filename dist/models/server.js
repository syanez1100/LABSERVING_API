"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const routes_1 = __importDefault(require("../routes/routes"));
const conexion_1 = require("../db/conexion");
const ope_routes_1 = __importDefault(require("../modules/operativo/ope.routes"));
const sop_routes_1 = __importDefault(require("../modules/soporte/sop.routes"));
const seg_routes_1 = __importDefault(require("../modules/seguridad/seg.routes"));
class Server {
    constructor() {
        this.connectionDB = new conexion_1.ConnectionDB();
        this.globalUsername = '';
        this.app = (0, express_1.default)();
        this.connectionDB.connect();
        this.port = process.env.PORT || '3500';
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(passport_1.default.initialize());
        this.app.use((0, express_session_1.default)({ secret: ('232938r0fhsdnco23'), resave: false, saveUninitialized: false }));
    }
    routes() {
        this.app.use(routes_1.default.operativo, ope_routes_1.default),
            this.app.use(routes_1.default.soporte, sop_routes_1.default),
            this.app.use(routes_1.default.seguridad, seg_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map