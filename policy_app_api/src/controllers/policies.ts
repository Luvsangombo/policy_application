import { RequestHandler } from "express";
import connection from "../config/db_connection";


type Policy = {
    id: number, description: string, title: string, owner: number, votes: number, created_at: string, category: string;
};


export const get: RequestHandler<unknown, { success: boolean, policies: Policy[]; }, unknown, { category: string, year: string; }> = (req, res, next) => {

    const query = `Select policies.*, users.lname, users.fname from policies inner join users on policies.owner=users.id where policies.category = ? and Year(policies.created_at) = ? order by policies.votes`;

    connection.query(query, [req.query.category, req.query.year], (error, results) => {
        if (error) {
            next(new Error(error.sqlMessage));
            return;
        }
        res.json({ success: true, policies: results });
    });

};


export const create: RequestHandler<unknown, { success: boolean; }, Policy, unknown> = (req, res, next) => {
    const { description, title, category } = req.body;
    const policy = { title, description, category, votes: 0, owner: res.locals.current_user };
    connection.query('INSERT INTO policies SET ?', policy, (error, results, field) => {
        if (error) {
            next(new Error(error.sqlMessage));
            return;
        }
        res.json({ success: true });
    });

};


export const vote: RequestHandler<unknown, { success: boolean, msg: string; }, { policy_id: string; }, unknown> = (req, res, next) => {
    const { policy_id } = req.body;
    connection.query('Select * from votes where user_id = ? and policy_id = ?', [res.locals.current_user, policy_id], (error, results, field) => {
        if (error) {
            next(error);
            return;
        }
        if (results.length > 0) {
            res.json({ success: false, msg: "already voted" });
            return;
        } else {
            const vote = { user_id: res.locals.current_user, policy_id: policy_id, voted: true };

            connection.query("INSERT INTO votes SET ?", vote, (error, result, field) => {
                if (error) {
                    next(new Error(error.sqlMessage));
                    return;
                }
                connection.query('UPDATE policies SET votes = votes + 1 where id = ?', policy_id, (error, results, field) => {
                    if (error) {
                        next(new Error(error.sqlMessage));
                        return;
                    }
                    res.json({ success: true, msg: "success" });
                });

            });

        }
    });


};
