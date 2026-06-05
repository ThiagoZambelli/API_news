import { Router } from "express";
import sectionController from "../controllers/section.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";

const route = Router();

route.post("/", authMiddleware, sectionController.create);
route.get("/", sectionController.findAll);
route.get("/search", sectionController.searchByTitle);
route.get("/byAuthor/:id", validId, validUser, sectionController.findByAuthor);

route.get("/:sectionId", sectionController.findById);
route.patch("/:id", authMiddleware, sectionController.update);

export default route;