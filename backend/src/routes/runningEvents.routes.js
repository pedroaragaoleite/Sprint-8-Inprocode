import { Router } from "express";
import { getEvents, updateEvent, getEvent, delEvent, createEvent, getLocations } from "../controllers/runningEvents.controller.js";

const router = Router();

router.get('/running_events', getEvents);
router.get('/running_events/:id', getEvent);
router.post('/running_events', createEvent)
router.put('/running_events/:id', updateEvent)
// router.patch('/running_events/:id', updateEvent);
router.delete('/running_events/:id', delEvent);

// maps
// router.get('/map_coords', getLocations);

export default router;