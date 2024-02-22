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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStrategy = void 0;
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seg_repository_1 = require("../modules/seguridad/seg.repository");
exports.localStrategy = new passport_local_1.Strategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield seg_repository_1.segRepository.usuarioByUsername(username);
        if (!user)
            return done(null, false, { message: 'El usuario no se encuentra registrado.' });
        console.log(user);
        const contrasena = user[0].password;
        const isMatch = yield bcryptjs_1.default.compareSync(password, contrasena);
        if (!isMatch) {
            // await userRepository.incrementLoginAttempts(username);
            return done(null, false, { message: 'Contraseña incorrecta.' });
        }
        // else {
        //     await userRepository.resetLoginAttempts(username);
        // }
        return done(null, user);
    }
    catch (err) {
        return done(err, false);
    }
}));
//# sourceMappingURL=passport_local.middleware.js.map