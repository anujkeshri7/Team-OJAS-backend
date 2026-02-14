import cloudinary from "../config/cloudinary.js";
import Project from "../models/projects.js";



const addProject = async (req, res) => {
  try {
    const {
      title,
      domain,
      shortDescription,
      problemStatement,
      objectives,
      solution,
      architecture,
      hardware,
      software,
      algorithms,
      implementation,
      results,
      challenges,
      applications,
      futureScope,
      github,
      demo,
    } = req.body;

    /* ---------------- REQUIRED CHECK ---------------- */
    if (!title || !domain || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title, Domain and Image are required",
      });
    }

    /* ---------------- TECH ARRAY ---------------- */
    let tech = [];
    if (req.body.tech) {
      try {
        tech = Array.isArray(req.body.tech)
          ? req.body.tech
          : JSON.parse(req.body.tech);
      } catch {
        tech = [];
      }
    }

    /* ---------------- IMAGE UPLOAD ---------------- */
    let uploadedImage;
    try {
      uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "ojas/projects",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    /* ---------------- CREATE PROJECT ---------------- */
    const project = await Project.create({
      title,
      domain,
      shortDescription,
      problemStatement,
      objectives,
      solution,
      architecture,
      hardware,
      software,
      algorithms,
      implementation,
      results,
      challenges,
      applications,
      futureScope,
      github,
      demo,
      tech,
      image: {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
      },
    });

    /* ---------------- RESPONSE ---------------- */
    return res.status(201).json({
      success: true,
      message: "Project added successfully 🚀",
      project,
    });

  } catch (error) {
    console.error("Add Project Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding project",
    });
  }
};


const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .select("title domain shortDescription image _id tech")
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching projects",
            error: error.message,
        });
    }
}


const getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.status(200).json({ success: true, project });
    } catch (error) {
        console.error("Error fetching project by ID:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching project",
            error: error.message,
        });
    }
}



export { addProject , getProjects, getProjectById };
