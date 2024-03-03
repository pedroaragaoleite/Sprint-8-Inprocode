import { pool } from "../db.js";

export const getEvents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM running_events')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
};