import jwt from "jsonwebtoken";
import { HandleError } from "./handleError";
import { HttpResponses } from "./httpResponses";
import { response } from "express";

const httpResponses = new HttpResponses();

const { JWT_SECRET_KEY, JWT_EXPIRES_IN, JWT_SECRET_KEY_REFRESH, JWT_EXPIRES_IN_REFRESH} = process.env;

export const generarJWT = (uid: string,username: string) => {
  const payload = { uid,username };

  const accessToken = jwt.sign(payload, JWT_SECRET_KEY || "", {expiresIn: JWT_EXPIRES_IN});
  const refreshToken = jwt.sign(payload, JWT_SECRET_KEY_REFRESH || "", { expiresIn: JWT_EXPIRES_IN_REFRESH});
  return { accessToken, refreshToken };
}

export const validarJWT = (token: any) => {
  try{
    return jwt.verify(token, (JWT_SECRET_KEY || '') );
  }catch(err){
    throw new HandleError(401,'No estás autorizado para acceder a este recurso.');
  }
};