import { Router } from "express";
import { getUsuario, login, postUsuario } from "./seg.controller";
import { metodoAutenticacion, tokenValido, usuarioActivo, usuarioAutenticado } from "../../middlewares/autenticacion.middleware";

const segRouter = Router();

segRouter.get('/login',[usuarioActivo,metodoAutenticacion],login);
segRouter.post('/usuario',[usuarioAutenticado],postUsuario);
segRouter.get('/usuario',[usuarioAutenticado],getUsuario);
segRouter.get('/check', [tokenValido]);


export default segRouter;