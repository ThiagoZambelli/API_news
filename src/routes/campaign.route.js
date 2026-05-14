import { Router } from "express";
import campaignController from "../controllers/campaign.controller.js"

const route = Router();

route.post("/", campaignController.create)
route.get("/", campaignController.findAll)
route.get("/:chapterId", campaignController.findById)

export default route;