import express from 'express';
import runningEventsRoutes from './routes/runningEvents.routes.js';


const app = express();

app.use(express.json());

// app.use(runningEventsRoutes);
app.use('/api', runningEventsRoutes);

app.use((req, res, next) => {
    req.status(404).json({
        message: "Endpoint not found"
    })
})

export default app;