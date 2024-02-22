import { HTTP_STATUS_CODES } from "../../constants/httpStatusCodes";
import { HandleError } from "../../helpers/handleError";
import { opeRepository } from "./ope.repository";

export const opeService = {
    clientes:  async () => {
        try {
            const modalidades = await opeRepository.clientes();          
            return modalidades;
        } catch (ERR: any) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    },
    equipos:  async () => {
        try {
            const equipos = await opeRepository.equipos();          
            return equipos;
        } catch (ERR: any) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    },
    equiposByCliente:  async (cliente: any) => {
        try {
            const equipos = await opeRepository.equiposByCliente(cliente);          
            return equipos;
        } catch (ERR: any) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    },
    seriesByEquipoByCliente:  async (cliente: any, equipo: any) => {
        try {
            const equipos = await opeRepository.seriesByEquipoByCliente(cliente,equipo);          
            return equipos;
        } catch (ERR: any) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
    },
}