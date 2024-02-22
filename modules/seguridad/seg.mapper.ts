import { Usuario } from "../../interfaces/seg.interface";

export function usuarioMapper( usuarios: any[] | undefined ): Usuario[] {
    if (!usuarios || usuarios.length === 0) {
      return [];
    }
    return usuarios.map(usuario => ({
        username: usuario.usuv_username,
        nombre: usuario.usuv_nombre,
        apellido: usuario.usuv_apellido,
        correo: usuario.usuv_correo,
        roles: usuario.usuv_roles
      }));
}