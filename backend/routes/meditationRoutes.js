import express from "express";
import {
  listMeditations,
  getMeditationBySlug,
} from "../controllers/meditationController.js";

const meditationRouter = express.Router();

meditationRouter.get("/", listMeditations);
meditationRouter.get("/:slug", getMeditationBySlug);

export default meditationRouter;
