import { Router } from "express";
import chapterController from "../controllers/chapter.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = Router();

route.post("/", authMiddleware, chapterController.create);
route.get("/", chapterController.findAll);
route.get("/search", chapterController.searchByTitle);
route.get("/:chapterId", chapterController.findById);

export default route;