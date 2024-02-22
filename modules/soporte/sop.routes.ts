import { Router } from "express";
import { postCliente, postEquipo, postSerie } from "./sop.controller";
import { usuarioAutenticado } from "../../middlewares/autenticacion.middleware";

const sopRouter = Router();

sopRouter.post('/cliente',[usuarioAutenticado],postCliente);
sopRouter.post('/equipo',[usuarioAutenticado],postEquipo);
sopRouter.post('/serie',[usuarioAutenticado],postSerie);

export default sopRouter;
