import { Router } from "express";
import sectionController from "../controllers/section.controller.js"

const route = Router();

route.post("/", sectionController.create)
route.get("/", sectionController.findAll)
route.get("/:chapterId", sectionController.findById)

export default route;