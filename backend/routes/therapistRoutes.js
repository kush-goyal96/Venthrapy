import express from "express";
import {
  listTherapists,
  getTherapistById,
} from "../controllers/therapistController.js";

const therapistRouter = express.Router();

therapistRouter.get("/", listTherapists);
therapistRouter.get("/:id", getTherapistById);

export default therapistRouter;
