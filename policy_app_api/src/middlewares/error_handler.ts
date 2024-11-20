import { ErrorRequestHandler } from "express";

const error_handler: ErrorRequestHandler = (error, req, res, next) => {
    res.status(222).json({ 'success': false, 'msg': error.message });
};

export default error_handler;