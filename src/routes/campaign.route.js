import { Router } from "express";
import campaignController from "../controllers/campaign.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = Router();

route.post("/", authMiddleware, campaignController.create);
route.get("/", campaignController.findAll);
route.get("/search", campaignController.searchByTitle);
route.get("/:campaignId", campaignController.findById);

export default route;