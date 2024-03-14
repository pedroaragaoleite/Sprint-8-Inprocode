import { Router } from "express";
import { getRestaurants } from "../controllers/maprestaurants.controller.js";

const routerRest = Router();

routerRest.get('/restaurants', getRestaurants);

export default routerRest;