import { QueryConfig } from "pg";
import { ConnectionDB } from "../../db/conexion";
import { HTTP_STATUS_CODES } from "../../constants/httpStatusCodes";
import { HandleError } from "../../helpers/handleError";

const db = new ConnectionDB();

export const sopRepository = {
    cliente: async (nombre: any) => {
        try {
          const connectionDB = await db.pool.connect();
          const query: QueryConfig = {
            text: `
            INSERT INTO OPE_TCLIENTES (CLIV_NOMBRE) VALUES ($1) RETURNING CLIN_ID
            `,
            values: [nombre],
          };
          const result = await connectionDB.query(query);
          await connectionDB.query('COMMIT'); 
          connectionDB.release();
          const respuesta = {
            _id: result.rows[0].clin_id,
            nombre: nombre
          }
          return respuesta;
        } catch (ERR: any) {
          if (ERR.code == 23505) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, 'Este cliente ya se encuentra registrado.');
          }
          throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
      },
    equipo: async (nombre: any) => {
        try {
          const connectionDB = await db.pool.connect();
          const query: QueryConfig = {
            text: `
            INSERT INTO OPE_TEQUIPOS (EQUV_NOMBRE) VALUES ($1) RETURNING EQUN_ID
            `,
            values: [nombre],
          };
          const result = await connectionDB.query(query);
          await connectionDB.query('COMMIT'); 
          connectionDB.release();
          const respuesta = {
            _id: result.rows[0].equn_id,
            nombre: nombre
          }
          return respuesta;
        } catch (ERR: any) {
          if (ERR.code == 23505) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, 'Este equipo ya se encuentra registrado.');
          }
          throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
      },
    serie: async (cliente: any, equipo: any, serie_equipo: any) => {
        try {
          const connectionDB = await db.pool.connect();
          const query: QueryConfig = {
            text: `
            INSERT INTO OPE_TSERIES (SERV_ID,SERN_EQUIPO,SERV_CLIENTE) VALUES ($1,$2,$3);
            `,
            values: [serie_equipo,equipo,cliente],
          };
          const result = await connectionDB.query(query);
          await connectionDB.query('COMMIT'); 
          connectionDB.release();
          const respuesta = {
            _serie: serie_equipo
          }
          return respuesta;
        } catch (ERR: any) {
          console.log(ERR);
          
          if (ERR.code == 23505) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, 'Esta serie ya se encuentra registrada.');
          }
          if (ERR.code == 23503) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, `Se esta violando una restricción: ${ERR.constraint}`);
          }
          
          throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
      },
}