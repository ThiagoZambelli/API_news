import { Router } from "express";
import {create, findAll, findById} from "../controllers/chapter.controller.js"

const route = Router();

route.post("/", create)
route.get("/", findAll)
route.get("/:chapterId", finById)

export default route;