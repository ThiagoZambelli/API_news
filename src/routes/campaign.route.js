import { Router } from "express";
import campaignController from "../controllers/campaign.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";

const route = Router();

route.post("/", authMiddleware, campaignController.create);
route.get("/", campaignController.findAll);
route.get("/search", campaignController.searchByTitle);
route.get("/byAuthor/:id", validId, validUser, campaignController.findByAuthor);

route.get("/:campaignId", campaignController.findById);
route.patch("/:id", authMiddleware, campaignController.update);

export default route;