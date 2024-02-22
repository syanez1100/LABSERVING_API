import { QueryConfig } from "pg";
import { HTTP_STATUS_CODES } from "../../constants/httpStatusCodes";
import { ConnectionDB } from "../../db/conexion";
import { HandleError } from "../../helpers/handleError";
import { clientesMapper, equiposMapper, seriesMapper } from "./ope.mapper";

const db = new ConnectionDB();

export const opeRepository = {
  clientes: async () => {
    try {
      const connectionDB = await db.pool.connect();
      const result = await connectionDB.query('SELECT * FROM ope_tclientes');
      connectionDB.release();
      const clientes = clientesMapper(result.rows)
      return clientes;
    } catch (ERR: any) {
      throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
    }
  },
  equipos: async () => {
    try {
      const connectionDB = await db.pool.connect();
      const result = await connectionDB.query('SELECT * FROM OPE_TEQUIPOS');
      connectionDB.release();
      const equipos = equiposMapper(result.rows)
      
      return equipos;
    } catch (ERR: any) {
      throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
    }
  },
  equiposByCliente: async (cliente: any) => {
    try {
      const connectionDB = await db.pool.connect();
      const query: QueryConfig = {
        text: `
          SELECT DISTINCT EQUN_ID,EQUV_NOMBRE,CLIV_NOMBRE,CLIN_ID
          FROM OPE_TEQUIPOS, OPE_TSERIES, OPE_TCLIENTES
          WHERE SERN_EQUIPO = EQUN_ID AND SERV_CLIENTE = CLIN_ID AND CLIN_ID = $1
        `,
        values: [cliente],
      };
      const result = await connectionDB.query(query);
      connectionDB.release();
      const equipos = equiposMapper(result.rows);
      const response = {
        _id: cliente,
        nombre_cliente: result.rows[0]?.cliv_nombre || 'DEFAULT',
        cantidad: result.rowCount,
        equipos
      }
      return response;
    } catch (ERR: any) {
      throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
    }
  },
  seriesByEquipoByCliente: async (cliente: any,equipo: any) => {
    try {
      const connectionDB = await db.pool.connect();
      const query: QueryConfig = {
        text: `
        SELECT EQUV_NOMBRE,SERV_ID,CLIV_NOMBRE,CLIN_ID
        FROM OPE_TEQUIPOS,OPE_TSERIES,OPE_TCLIENTES
        WHERE SERN_EQUIPO=EQUN_ID AND SERV_CLIENTE=CLIN_ID AND CLIN_ID=$1 AND EQUN_ID=$2`,
        values: [cliente,equipo],
      };
      const result = await connectionDB.query(query);
      connectionDB.release();
      const series = seriesMapper(result.rows);
      const response = {
        _id: cliente,
        nombre_cliente: result.rows[0]?.cliv_nombre || 'DEFAULT',
        cantidad: result.rowCount,
        series
      }
      return response;
    } catch (ERR: any) {
      throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
    }
  }
}