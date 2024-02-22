// HttpStatusCodes.ts

export const HTTP_STATUS_CODES = {
    OK: { CODE: 200, STATUS: 'Ok' },
    CREATED: { CODE: 201, STATUS: 'Created' },
    ACCEPTED: { CODE: 202, STATUS: 'Accepted' },
    NO_CONTENT: { CODE: 204, STATUS: 'No Content' },
    BAD_REQUEST: { CODE: 400, STATUS: 'Bad Request' },
    UNAUTHORIZED: { CODE: 401, STATUS: 'Unauthorized' },
    FORBIDDEN: { CODE: 403, STATUS: 'Forbidden' },
    NOT_FOUND: { CODE: 404, STATUS: 'Not Found' },
    UNPROCESSABLE_CONTENT: { CODE: 422, STATUS: 'Unprocessable Content' },
    INTERNAL_SERVER_ERROR: { CODE: 500, STATUS: 'Internal Server Error' },
  };