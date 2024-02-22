import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../helpers/catchAsyncErrors";
import { segRepository } from "../modules/seguridad/seg.repository";
import { HandleError } from "../helpers/handleError";
import { HttpResponses } from "../helpers/httpResponses";
import passport from "./passport.middleware";
import { validarJWT } from "../helpers/jwt";
import { JwtPayload } from "jsonwebtoken";

let globalUsername: string | undefined;

const httpResponses = new HttpResponses();

export const usuarioActivo = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    const user = await segRepository.usuarioByUsername(username);
    if (user.length == 0) throw new HandleError(401,'El usuario no se encuentra registrado.');
    const estado = user[0].estado;
    if (estado !== 'ACTIVO') throw new HandleError(401,'No estás autorizado para acceder a este recurso.');
    next();
});

export const metodoAutenticacion = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  const user: any = await segRepository.usuarioByUsername(username);
  if (user.length == 0) throw new HandleError(401, 'No estás autorizado para acceder a este recurso.');
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return httpResponses.Unauthorized(res, info.message);
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  })(req, res, next);
});

export const usuarioAutenticado = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const token_key: string = req.header('token_key')?.toString() ?? '';
  if (!token_key) throw new HandleError(401,'No estás autorizado para acceder a este recurso.');
  
  const decoded = await validarJWT(token_key) as JwtPayload;

  const { _json, uid, username } = decoded;
  const _documento = (_json) ? _json.sAMAccountName.toUpperCase() : uid;
  const user = (_json) ? _json.sAMAccountName.toUpperCase() : username;
  const usuario: any = await segRepository.usuarioByUsername(user);

  if (usuario.length == 0) throw new HandleError(401,'No estás autorizado para acceder a este recurso.');

  
  globalUsername = username;
  (req as any).userSession = username;
  next();
});

export const tokenValido = catchAsyncErrors(async (req: Request, res: Response) => {
  const token_key: string = req.header('token_key')?.toString() ?? '';
  
  if (!token_key) throw new HandleError(401,'No estás autorizado para acceder a este recurso.');
  
  const decoded = await validarJWT(token_key) as JwtPayload;

  const { _json, username } = decoded;
  const user = (_json) ? _json.sAMAccountName.toUpperCase() : username;
  const usuario: any = await segRepository.usuarioByUsername(user);

  if (usuario.length == 0) throw new HandleError(401,'No estás autorizado para acceder a este recurso.');

  delete usuario[0].estado;
  delete usuario[0].password;

  const respuesta = {
    usuario,
    token_key
  }
  
  

  return httpResponses.Ok(res,'Token Valido',respuesta);

});

export function getGlobalUsername(req: Request) {
  return (req as any).userSession;;
}

