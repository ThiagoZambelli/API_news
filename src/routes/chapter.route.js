import { Router } from "express";
import chapterController from "../controllers/chapter.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";

const route = Router();

route.post("/", authMiddleware, chapterController.create);
route.get("/", chapterController.findAll);
route.get("/search", chapterController.searchByTitle);
route.get("/byAuthor/:id", validId, validUser, chapterController.findByAuthor)

route.get("/:chapterId", chapterController.findById);
route.patch("/:id", authMiddleware, chapterController.update);

export default route;