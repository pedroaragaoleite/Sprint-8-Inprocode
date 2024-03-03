import { Router } from "express";
import { getEvents } from "../controllers/runningEvents.controller.js";

const router = Router();

router.get('/running_events', getEvents);



export default router;