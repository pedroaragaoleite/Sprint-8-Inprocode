import { Router } from "express";
import { getMarkers } from "../controllers/mapPlaces.controller.js";

const routerMap = Router();

routerMap.get('/map_coords', getMarkers);

export default routerMap;