import { HTTP_STATUS_CODES } from "../../constants/httpStatusCodes";
import { HandleError } from "../../helpers/handleError";
import { segRepository } from "./seg.repository";

export const segService = { 
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
            return respuesta;
        } catch (ERR: any) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    },  
}