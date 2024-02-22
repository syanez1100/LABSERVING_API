import { Response } from "express";
import { HTTP_STATUS_CODES } from "../constants/httpStatusCodes";

export class HttpResponses {
  Ok(res: Response, message: any, data: any) {
    return res.status(HTTP_STATUS_CODES.OK.CODE).json({
      status: HTTP_STATUS_CODES.OK.STATUS,
      message,
      data,
    });
  }

  NotFound(res: Response, message: any) {
    return res.status(HTTP_STATUS_CODES.NOT_FOUND.CODE).json({
      status: HTTP_STATUS_CODES.NOT_FOUND.STATUS,
      message,
      data: [],
    });
  }

  Error(res: Response, message: any) {
    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE).json({
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.STATUS,
      message,
    });
  }

  Unauthorized(res: Response,message: string) {
    return res.status(HTTP_STATUS_CODES.UNAUTHORIZED.CODE).json({
      status: HTTP_STATUS_CODES.UNAUTHORIZED.STATUS,
      message
    });
  }
}
