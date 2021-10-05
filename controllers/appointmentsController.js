const pool = require("../models/db");
require("dotenv").config();
const { tokenGenerator } = require("../utils/tokenGen");

module.exports = {
    async getAllAppointment(req, res) {
        try {
            if (req.user.data.role_id === 1) {
                const page = parseInt(req.query.page || 1);
                const limit = parseInt(req.query.limit || 10);
                const offset = (page - 1) * limit;
                const query = `SELECT * FROM appointments LIMIT ${limit} OFFSET ${offset}`;
                const appointment = await pool.query(query);

                const total = await pool.query("SELECT COUNT(*)::integer FROM appointments");
                const next = page < Math.ceil(total.rows[0].count / limit) ? `/appointments?page=${page + 1}&limit=${limit}` : null;
                const previous = page > 1 ? `/appointments?page=${page - 1}&limit=${limit}` : null;
                const meta = {
                    total: total.rows[0].count,
                    limit: limit,
                    page: page,
                    next: next,
                    previous: previous,
                    data: appointment.rows
                };
                res.status(200).json({
                    meta,
                });
            } else {
                res.status(403).json({
                    message: "Forbidden"
                });
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    async createAppointment(req, res) {
        try {
            const { fname, email, mobile, book_appoint } = req.body;
            const newAppoint = await pool.query("INSERT INTO appointments (fname, email, mobile, book_appoint) VALUES ($1,$2,$3,$4) RETURNING *", [fname, email, mobile, book_appoint])
            const token = tokenGenerator(newAppoint.rows[0]);
            res.status(201).json({
                message: "Appointment created",
                data: newAppoint.rows[0],
                token
            });
            // return res.send(newAppoint.rows[0])
        } catch (error) {
            console.log(error.message)
            return res.status(500).send({ message: "Server error" })
        }
    },
    async deleAppointment(req, res) {
        try {
            // delete appointment by id 
            if (req.user.data.role_id === 1) {
                const { id } = req.params;
                const deleteAppoint = await pool.query("DELETE FROM appointments WHERE id = $1", [id]);
                return res.send({ message: "Appointment deleted" })
            } else {
                res.status(403).json({
                    message: "Forbidden"
                });
            }
        } catch (error) {
            return res.status(500).send({ message: "Server error" })
        }
    },

}