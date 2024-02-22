"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioMapper = void 0;
function usuarioMapper(usuarios) {
    if (!usuarios || usuarios.length === 0) {
        return [];
    }
    return usuarios.map(usuario => ({
        username: usuario.usuv_username,
        nombre: usuario.usuv_nombre,
        apellido: usuario.usuv_apellido,
        correo: usuario.usuv_correo,
        roles: usuario.usuv_roles,
        estado: usuario.usuv_estado,
        password: usuario.usuv_password,
    }));
}
exports.usuarioMapper = usuarioMapper;
//# sourceMappingURL=seg.mapper.js.map