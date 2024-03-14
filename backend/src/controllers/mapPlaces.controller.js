import { pool } from "../db.js";

export const getMarkers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM map_coords');
        res.json(rows)
    } catch (error) {
        console.error("Failed to get markers:", error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}
