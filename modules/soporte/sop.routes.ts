import { Router } from "express";
import { postCliente, postEquipo, postSerie } from "./sop.controller";

const sopRouter = Router();

sopRouter.post('/cliente',postCliente);
sopRouter.post('/equipo',postEquipo);
sopRouter.post('/serie',postSerie);


export default sopRouter;
