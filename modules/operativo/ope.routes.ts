import { Router } from "express";
import { getClientes, getEquipos, getEquiposByCliente, getSeriesByEquipoByCliente } from "./ope.controller";
import { usuarioAutenticado } from "../../middlewares/autenticacion.middleware";

const opeRouter = Router();

opeRouter.get('/clientes',[usuarioAutenticado],getClientes);
opeRouter.get('/equipos',[usuarioAutenticado],getEquipos);
opeRouter.get('/equipos/:cliente',[usuarioAutenticado],getEquiposByCliente);
opeRouter.get('/series/:cliente/:equipo',[usuarioAutenticado],getSeriesByEquipoByCliente);

export default opeRouter;