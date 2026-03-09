import { Router } from "express";
import { addMembers, fetchMembers , deleteMember } from "../controllers/members.js";
import upload from "../config/upload.js";
import { 
    loginUser, 
    registerUser,
    fetchAdmins,
    addAdmin,
    removeAdmin

 } from "../controllers/users.js";
import { checkAuth } from "../services.js";
import {
  addProject,
  getProjects,
  getProjectById,
  deleteProject,
  editProject
} from "../controllers/projects.js";
import checkAuthMiddelware from "../middelware/checkAuth.js";
import { uploadImagesController , fetchGalleryImages, deleteGalleryImage } from "../controllers/gallery.js";

const router = Router();

router.post("/add-member", upload.single("profilePic"), addMembers);
router.get("/get-members", fetchMembers);
router.delete("/remove-member/:id", checkAuthMiddelware, deleteMember);


// User routes
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    path: "/",
  });
  res.status(200).send("Logged out");
});


// Admin routes
router.get("/fetch-admins",fetchAdmins)

router.post("/add-admin",checkAuthMiddelware,addAdmin);

router.post('/remove-admin',checkAuthMiddelware,removeAdmin)


// Authentication check route
router.get("/check-auth", checkAuth);


// Project routes
router.post("/add-project", checkAuthMiddelware, upload.single("image"),  addProject);

router.get("/get-projects", getProjects);

router.get("/get-project/:id", getProjectById);

router.delete("/delete-project/:id", checkAuthMiddelware, deleteProject);

router.post("/edit-project/:id",checkAuthMiddelware,upload.single("image"),editProject)

router.post('/upload-images',checkAuthMiddelware, upload.array('images', 20), uploadImagesController)

router.get('/gallery', fetchGalleryImages)

router.post('/delete-gallery-image', checkAuthMiddelware, deleteGalleryImage)

export default router;
