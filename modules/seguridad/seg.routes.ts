import { Router } from "express";
import { getUsuario, postUsuario } from "./seg.controller";

const segRouter = Router();

segRouter.post('/usuario',postUsuario);
segRouter.get('/usuario',getUsuario);


export default segRouter;