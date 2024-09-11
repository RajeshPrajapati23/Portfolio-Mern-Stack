import express from "express";
import upload from "../middleware/upload-middleware.js";
import {
  deletProject,
  editProject,
  getProject,
  projectAdd,
} from "../controllers/Project-controller.js";

const router = express.Router();

router.post("/add", upload.single("file"), projectAdd);
router.get("/get", getProject);
router.delete("/delete/:id", deletProject);
router.put("/update", upload.single("file"), editProject);
export default router;
