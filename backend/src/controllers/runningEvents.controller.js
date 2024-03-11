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

export const getEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await pool.query('SELECT * FROM running_events WHERE id = ? ', [id]);
        if (rows <= 0) return res.status(404).json({
            message: "Event not found"
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export const createEvent = async (req, res) => {
    try {
        const {name, city, type, route_type, distance, latitude, longitude, start, end } = req.body;
        const [rows] = await pool.query('INSERT INTO running_events (name, city, type, route_type, distance, latitude, longitude, start, end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, city, type, route_type, distance, latitude, longitude, start, end]);
        res.send({
            id: rows.insertId,
            name,
            city,
            type,
            route_type,
            distance,
            latitude,
            longitude,
            start,
            end
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, city, type, route_type, distance, latitude, longitude, start, end } = req.body;
        const [result] = await pool.query('UPDATE running_events SET name = IFNULL(?, name), city = IFNULL(?, city), type = IFNULL(?, type), route_type = IFNULL(?, route_type), distance = IFNULL(?, distance), latitude= IFNULL(?, latitude), longitude = IFNULL(?, longitude), start = IFNULL(?, start), end = IFNULL(?, end) WHERE id = ?', [name, city, type, route_type, distance, latitude, longitude, start, end,  id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: "Event not found"
        })
        res.json('Event updated')
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export const delEvent = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM running_events WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: "Event not found"
        })
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export const getLocations = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM map_coords')
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}