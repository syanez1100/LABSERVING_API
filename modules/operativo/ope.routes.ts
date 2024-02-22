import { Router } from "express";
import { getClientes, getEquipos, getEquiposByCliente, getSeriesByEquipoByCliente } from "./ope.controller";

const opeRouter = Router();

opeRouter.get('/clientes',getClientes);
opeRouter.get('/equipos',getEquipos);
opeRouter.get('/equipos/:cliente',getEquiposByCliente);
opeRouter.get('/series/:cliente/:equipo',getSeriesByEquipoByCliente);

export default opeRouter;