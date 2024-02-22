"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponses = void 0;
const httpStatusCodes_1 = require("../constants/httpStatusCodes");
class HttpResponses {
    Ok(res, message, data) {
        return res.status(httpStatusCodes_1.HTTP_STATUS_CODES.OK.CODE).json({
            status: httpStatusCodes_1.HTTP_STATUS_CODES.OK.STATUS,
            message,
            data,
        });
    }
    NotFound(res, message) {
        return res.status(httpStatusCodes_1.HTTP_STATUS_CODES.NOT_FOUND.CODE).json({
            status: httpStatusCodes_1.HTTP_STATUS_CODES.NOT_FOUND.STATUS,
            message,
            data: [],
        });
    }
    Error(res, message) {
        return res.status(httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.CODE).json({
            status: httpStatusCodes_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR.STATUS,
            message,
        });
    }
    Unauthorized(res, message) {
        return res.status(httpStatusCodes_1.HTTP_STATUS_CODES.UNAUTHORIZED.CODE).json({
            status: httpStatusCodes_1.HTTP_STATUS_CODES.UNAUTHORIZED.STATUS,
            message
        });
    }
}
exports.HttpResponses = HttpResponses;
//# sourceMappingURL=httpResponses.js.map