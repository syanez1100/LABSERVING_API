import { HTTP_STATUS_CODES } from "../../constants/httpStatusCodes";
import { HandleError } from "../../helpers/handleError";
import { generarJWT } from "../../helpers/jwt";
import { segRepository } from "./seg.repository";

export const segService = { 
    login:  async (usuario: any) => {
        try {
            const result = await segRepository.usuarioByUsername(usuario);
            delete result[0].estado;
            delete result[0].password;
            const token = await generarJWT( result[0].username );
            return token;
        } catch (ERR: any) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    },  
    usuario:  async (usuario: any) => {
        try {
            const usuario_new = await segRepository.usuario(usuario);
            return usuario_new;
        } catch (ERR: any) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    },  
    usuarioByUsername:  async (usuario: any) => {
        try {
            const respuesta = await segRepository.usuarioByUsername(usuario);
            delete respuesta[0].estado;
            delete respuesta[0].password;
            return respuesta;
        } catch (ERR: any) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    },  
}