import { Router } from "express";
import sectionController from "../controllers/section.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = Router();

route.post("/", authMiddleware, sectionController.create)
route.get("/", sectionController.findAll)
route.get("/:chapterId", sectionController.findById)

export default route;