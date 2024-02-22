"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = void 0;
class HandleError extends Error {
    constructor(code = 500, message = 'Internal Server Error') {
        super(message);
        this.name = 'HandleError'; // Set the error name
        this.code = code;
    }
}
exports.HandleError = HandleError;
//# sourceMappingURL=handleError.js.map