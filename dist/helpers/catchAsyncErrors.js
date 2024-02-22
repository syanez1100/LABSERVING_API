"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncErrors = void 0;
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
const httpResponses_1 = require("./httpResponses");
const httpResponses = new httpResponses_1.HttpResponses();
const errorsHandling = (err, res) => {
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
    if (code === httpStatusCodes_1.HTTP_STATUS_CODES.UNAUTHORIZED.CODE) {
        httpResponses.Unauthorized(res, message);
    }
    else {
        httpResponses.Error(res, message);
    }
};
// Definir la función de captura de errores asíncronos
const catchAsyncErrors = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => errorsHandling(err, res));
    };
};
exports.catchAsyncErrors = catchAsyncErrors;
//# sourceMappingURL=catchAsyncErrors.js.map