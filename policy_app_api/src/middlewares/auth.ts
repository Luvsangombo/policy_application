import { createHmac } from "node:crypto";
import { RequestHandler } from "express";
import dotenv from "dotenv";
import connection from "../config/db_connection";

dotenv.config();

export const checkToken: RequestHandler = (req, res, next) => {
    if (!req.headers['authorization']) throw Error('No authentication header');
    const combination = (req.headers['authorization'] as string).split('.');
    const enc_data = combination[0];
    const hash_data = combination[1];
    const privKEY: string = process.env.PRIVATE_KEY || "wap";
    const hash_data_again = createHmac('sha256', privKEY).update(enc_data).digest('hex');
    if (hash_data === hash_data_again) {
        const { email } = JSON.parse(Buffer.from(enc_data, 'base64').toString());
        connection.query("SELECT * FROM users WHERE email = ? ", email, function (error, result) {
            if (error) {
                next(new Error("user not found"));
                return;
            }
            res.locals.current_user = result[0].id;
            next();
        });
    } else {
        throw Error('Hash do not match');
    }
};