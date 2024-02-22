import { NextFunction, Response } from "express";
import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes";
import { HttpResponses } from "./httpResponses";

const httpResponses = new HttpResponses();

const errorsHandling = (err: any, res: Response) => {
    const { code, message } = err;
    // if (code === HTTP_STATUS_CODES.BAD_REQUEST.CODE) {
    //     httpResponse.BadRequest(res, message);
    // } else 
    // } else if (code === HTTP_STATUS_CODE.FORBIDDEN.CODE) {
    //     httpResponse.Forbidden(res, message);
    // } else if (code === HTTP_STATUS_CODE.NOT_FOUND.CODE) {
    //     httpResponse.NotFound(res, message);
    // } else if (code === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR.CODE) {
    //     httpResponse.InternalServerError(res, message);
    // } else {
    // }
    if (code === HTTP_STATUS_CODES.UNAUTHORIZED.CODE) {
        httpResponses.Unauthorized(res, message);
    }else{
        httpResponses.Error(res, message);
    }
};

// Definir la función de captura de errores asíncronos
export const catchAsyncErrors = (fn: Function) => {
    return (req: any, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err: any) => errorsHandling(err, res));
    };
};