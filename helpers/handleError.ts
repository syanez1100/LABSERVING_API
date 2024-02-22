export class HandleError extends Error {
    code: number;

    constructor(
        code = 500,
        message = 'Internal Server Error'
    ) {
        super(message);
        this.name = 'HandleError'; // Set the error name
        this.code = code;
    }
}