import { QueryConfig } from "pg";
import { ConnectionDB } from "../../db/conexion";
import { HandleError } from "../../helpers/handleError";
import { HTTP_STATUS_CODES } from "../../constants/httpStatusCodes";
import bcryptjs from "bcryptjs";
import { usuarioMapper } from "./seg.mapper";

const db = new ConnectionDB();

export const segRepository = {
    usuario: async (usuario: any) => {
        try {
          let { username,nombre,apellido,password,correo,roles } = usuario;
          const salt = bcryptjs.genSaltSync();
          password = bcryptjs.hashSync(password,salt);
          username = username.toUpperCase();
          nombre = nombre.toUpperCase();
          apellido = apellido.toUpperCase();
          
          const connectionDB = await db.pool.connect();
          const query: QueryConfig = {
            text: `
            INSERT INTO SEG_TUSUARIOS (USUV_USERNAME,USUV_NOMBRE,USUV_PASSWORD,USUV_APELLIDO,USUV_CORREO,USUV_ROLES) 
            VALUES ($1,$2,$3,$4,$5,$6)
            `,
            values: [username,nombre,password,apellido,correo,roles],
          };
          await connectionDB.query(query);
          await connectionDB.query('COMMIT'); 
          connectionDB.release();
          const respuesta = {
            username,
            nombre,
            apellido,
            correo
          }
          return respuesta;
        } catch (ERR: any) {
          if (ERR.code == 23505) {
            throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, 'Este usuario ya se encuentra registrado.');
          }
          throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
      },
    usuarioByUsername: async (username: any) => {
        try {
          const connectionDB = await db.pool.connect();
          const query: QueryConfig = {
            text: `
            SELECT USUN_ID,USUV_USERNAME,USUV_NOMBRE,USUV_APELLIDO,USUV_CORREO,USUV_ROLES 
            FROM SEG_TUSUARIOS 
            WHERE USUV_USERNAME = $1
            `,
            values: [username],
          };
          const result = await connectionDB.query(query); 
          connectionDB.release();
          const usuario = usuarioMapper(result.rows);
          return usuario;
        } catch (ERR: any) {
          throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
      },
    usuarioExiste: async (username: any) => {
        try {
          
          const connectionDB = await db.pool.connect();
          const query: QueryConfig = {
            text: `
            SELECT USUN_ID 
            FROM SEG_TUSUARIOS 
            WHERE USUV_USERNAME = $1
            `,
            values: [username],
          };
          const result = await connectionDB.query(query); 
          connectionDB.release();
          return result.rows.length;
        } catch (ERR: any) {
          throw new HandleError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE, ERR);
        }
      },
 }
