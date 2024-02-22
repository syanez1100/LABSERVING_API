import { Request, Response } from "express";
import { catchAsyncErrors } from "../../helpers/catchAsyncErrors";
import { HttpResponses } from "../../helpers/httpResponses";
import { segService } from "./seg.services";

const httpResponses = new HttpResponses();

export const login = catchAsyncErrors(async (req: Request,res: Response) => {
    const usuario = req.body;
    const result = await segService.login(usuario.username);
    httpResponses.Ok(res,"Usuario autenticado correctamente.",result);
});

export const postUsuario = catchAsyncErrors(async (req: Request,res: Response) => {
    const usuario = req.body;
    const result = await segService.usuario(usuario);

    httpResponses.Ok(res,"Usuario creado correctamente.",result);
});

export const getUsuario = catchAsyncErrors(async (req: Request,res: Response) => {
    const { username } = req.body;
    const result = await segService.usuarioByUsername(username);
    httpResponses.Ok(res,"Usuario obtenido correctamente.",result);
});