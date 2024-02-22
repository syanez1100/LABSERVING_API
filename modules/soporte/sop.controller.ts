import { Request, Response } from "express";
import { catchAsyncErrors } from "../../helpers/catchAsyncErrors";
import { HttpResponses } from "../../helpers/httpResponses";
import { sopService } from "./sop.services";

const httpResponses = new HttpResponses();

export const postCliente = catchAsyncErrors(async (req: Request,res: Response) => {
    const { nombre } = req.body;
    const result = await sopService.cliente(nombre);

    httpResponses.Ok(res,"Cliente creado correctamente.",result);
});

export const postEquipo = catchAsyncErrors(async (req: Request,res: Response) => {
    const { nombre } = req.body;
    const result = await sopService.equipo(nombre);

    httpResponses.Ok(res,"Equipo creado correctamente.",result);
});

export const postSerie = catchAsyncErrors(async (req: Request,res: Response) => {
    const { cliente, equipo, serie_equipo } = req.body;
    const result = await sopService.serie(cliente,equipo,serie_equipo);

    httpResponses.Ok(res,"Serie creada correctamente.",result);
});