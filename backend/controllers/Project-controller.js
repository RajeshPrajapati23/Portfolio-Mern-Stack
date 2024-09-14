import dotenv from "dotenv";
dotenv.config();
import Project from "../models/Project.js";
import { uploadToCloudinary, cloudinary } from "../service/cloudinary.js";
import fs from "fs";
import jwt from "jsonwebtoken";
const { JWTKEY } = process.env;

const projectAdd = async (req, res) => {
  const { title, description, base64, portfolioUrl } = req.body;
  console.log(req.body);
  console.log(title, description, base64);

  if (!title || !description || !base64 || !portfolioUrl) {
    res.status(400).json({ msg: "All Fields are required", succ: false });
    return;
  }

  try {
    const image = await uploadToCloudinary(base64);

    const project = await Project.create({
      title,
      description,
      image,
      portfolioUrl,
    });
    // await project.save();
    console.log("project", project);

    // fs.unlink(file.path, (err) => {
    //   if (err) {
    //     console.error(`Failed to delete file ${file.path}:`, err);
    //     return res.status(500).send("Failed to delete file after error.");
    //   }
    //   console.log("File deleted from local");
    // });

    res
      .status(200)
      .json({ msg: "Data Successfully Added", project, succ: true });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ msg: "Failed to add project", err: err.message });
  }
};
export const getProject = async (req, res) => {
  const { authorization } = req.headers;

  const token = authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ msg: "Token is Required", succ: false });
    return;
  }
  try {
    await jwt.verify(token, JWTKEY);
    const data = await Project.find();
    return res
      .status(200)
      .json({ msg: "Successful", projects: data, succ: true });
  } catch (error) {
    res.status(403).send("Invalid Token");
  }
};
export const deletProject = async (req, res) => {
  const { id } = req.params;
  console.log(id, "id");

  try {
    const project = await Project.findById(id);
    if (!project)
      res.status(404).json({ msg: "Project Not Found", succ: false });

    const imgId = project.image.public_id;
    await cloudinary.uploader.destroy(imgId);
    await Project.findByIdAndDelete(id);
    res.status(200).json({
      msg: "Project deleted successfully",
      succ: true,
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

export const editProject = async (req, res) => {
  const { title, description, id, base64, portfolioUrl } = req.body;

  if (!title || !description || !id || !portfolioUrl) {
    return res
      .status(400)
      .json({ msg: "All Fields are required", succ: false });
  }
  let project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ msg: "Project not found", succ: false });
  }
  if (base64) {
    const image = await uploadToCloudinary(base64, project.image.public_id);
    project.image = image;
  }
  project.title = title;
  project.description = description;
  project.portfolioUrl = portfolioUrl;
  await project.save();
  console.log("Project updated successfully", project);
  return res
    .status(200)
    .json({ msg: "project updated successfully", project, succ: false });
};
export { projectAdd };
