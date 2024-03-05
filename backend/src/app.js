import express from 'express';
import cors from 'cors';
import runningEventsRoutes from './routes/runningEvents.routes.js';




const app = express();

const corsOptions = {
    origin: 'http://localhost:4200', // Allow only requests from your Angular app
};

app.use(express.json());
app.use(cors(corsOptions));

app.get('/api/config', (req, res) => {
    res.json({ MAPAPI: process.env.MAPAPI })
})

// app.use(runningEventsRoutes);
app.use('/api', runningEventsRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    })
})

export default app;