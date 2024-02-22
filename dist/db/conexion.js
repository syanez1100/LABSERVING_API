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
exports.ConnectionDB = void 0;
const pg_1 = require("pg");
const dbConfig_1 = require("../config/dbConfig");
class ConnectionDB {
    constructor() {
        this.pool = new pg_1.Pool(dbConfig_1.dbConfig);
        this.pool.on('error', (err) => {
            console.error('Error en el pool de PostgreSQL', err);
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pool.connect();
                console.log('Conexión establecida con éxito a PostgreSQL.');
            }
            catch (error) {
                console.error('Error al conectar a PostgreSQL:', error);
                throw error;
            }
        });
    }
}
exports.ConnectionDB = ConnectionDB;
//# sourceMappingURL=conexion.js.map