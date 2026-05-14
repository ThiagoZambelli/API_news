import { Router } from "express";
import chapterController from "../controllers/chapter.controller.js"

const route = Router();

route.post("/", chapterController.create)
route.get("/", chapterController.findAll)
route.get("/:chapterId", chapterController.findById)

export default route;