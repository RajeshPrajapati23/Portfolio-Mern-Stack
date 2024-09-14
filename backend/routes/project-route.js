import express from "express";
import upload from "../middleware/upload-middleware.js";
import {
  deletProject,
  editProject,
  getProject,
  projectAdd,
} from "../controllers/Project-controller.js";

const router = express.Router();

router.post("/add", projectAdd);
router.get("/get", getProject);
router.delete("/delete/:id", deletProject);
router.put("/update", editProject);
export default router;
