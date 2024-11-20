import { createHmac } from "node:crypto";
import { RequestHandler } from "express";

import connection from "../config/db_connection";

import dotenv from "dotenv";

dotenv.config();

type User = { email: string, fname: string, lname: string, entry_year: string; };

export const login: RequestHandler<unknown, { success: boolean, enc_data: string, hash_data: string; }, { email: string; }, unknown> = (req, res, next) => {
    const { email } = req.body;

    connection.query('SELECT * FROM users WHERE email = ?', email, (error, results, field) => {
        if (error) {
            next(new Error(error.sqlMessage));
            return;
        }
        if (results.length < 1 || results === undefined) {
            next(new Error("User not found"));
            return;
        }
        const privKEY: string = process.env.PRIVATE_KEY || "wap";
        const enc_data = Buffer.from(JSON.stringify({ email })).toString("base64");
        const hash_data = createHmac('sha256', privKEY).update(enc_data).digest('hex');
        res.json({ success: true, enc_data, hash_data });
    });

};


export const signup: RequestHandler<unknown, { success: boolean; }, User, unknown> = (req, res, next) => {
    const { email, fname, lname, entry_year } = req.body;
    const user: User = { email, fname, lname, entry_year };
    connection.query('INSERT INTO users SET ?', user, (error, results, field) => {
        if (error) {
            next(new Error(error.sqlMessage));
            return;
        };
        res.json({ success: true });
    });
};

export const usersController: RequestHandler<unknown, { success: boolean, secret: string; }, unknown, unknown> = (req, res, next) => {
    res.json({ success: true, secret: 'You are a truly a good boy!' });
};