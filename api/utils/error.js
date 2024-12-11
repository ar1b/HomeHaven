export const errorHandler = (statusCode, message) => {
    error = new Error();
    error.statusCode = statusCode
    error.message = message
    return error;
}