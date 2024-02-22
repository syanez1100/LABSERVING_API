"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleError_1 = require("./handleError");
const httpResponses_1 = require("./httpResponses");
const httpResponses = new httpResponses_1.HttpResponses();
const { JWT_SECRET_KEY, JWT_EXPIRES_IN, JWT_SECRET_KEY_REFRESH, JWT_EXPIRES_IN_REFRESH } = process.env;
const generarJWT = (uid, username) => {
    const payload = { uid, username };
    const accessToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET_KEY || "", { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET_KEY_REFRESH || "", { expiresIn: JWT_EXPIRES_IN_REFRESH });
    return { accessToken, refreshToken };
};
exports.generarJWT = generarJWT;
const validarJWT = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, (JWT_SECRET_KEY || ''));
    }
    catch (err) {
        throw new handleError_1.HandleError(401, 'No estás autorizado para acceder a este recurso.');
    }
};
exports.validarJWT = validarJWT;
//# sourceMappingURL=jwt.js.map