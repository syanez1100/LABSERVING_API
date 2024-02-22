import { HTTP_STATUS_CODES } from "../../constants/httpStatusCodes";
import { HandleError } from "../../helpers/handleError";
import { sopRepository } from "./sop.repository";

export const sopService = {
    cliente:  async (nombre: any) => {
        try {
            const cliente = await sopRepository.cliente(nombre);
            return cliente;
        } catch (ERR: any) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    },    
    equipo:  async (nombre: any) => {
        try {
            const equipo = await sopRepository.equipo(nombre);
            return equipo;
        } catch (ERR: any) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    },    
    serie:  async (cliente: any,equipo: any,serie_equipo: any) => {
        try {
            const serie = await sopRepository.serie(cliente,equipo,serie_equipo);
            return serie;
        } catch (ERR: any) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    },    
}
