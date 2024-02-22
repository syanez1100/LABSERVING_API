import { Request, Response } from "express";

import { HttpResponses } from "../../helpers/httpResponses";
import { catchAsyncErrors } from "../../helpers/catchAsyncErrors";
import { opeService } from "./ope.serivce";

const httpResponses = new HttpResponses();

export const getClientes = catchAsyncErrors(async (req: Request,res: Response) => {
    const result = await opeService.clientes();
    httpResponses.Ok(res,"Clientes obtenidos correctamente.",result);
});

export const getEquipos = catchAsyncErrors(async (req: Request,res: Response) => {
    const result = await opeService.equipos();
    httpResponses.Ok(res,"Equipos obtenidos correctamente.",result);
});

export const getEquiposByCliente = catchAsyncErrors(async (req: Request,res: Response) => {
    const {cliente} = req.params
    const result = await opeService.equiposByCliente(cliente);
    httpResponses.Ok(res,"Equipos obtenidos correctamente.",result);
});

export const getSeriesByEquipoByCliente = catchAsyncErrors(async (req: Request,res: Response) => {
    const { cliente,equipo } = req.params
    const result = await opeService.seriesByEquipoByCliente(cliente,equipo);
    httpResponses.Ok(res,"Equipos obtenidos correctamente.",result);
});