import { Router } from "express";
import { addMembers, fetchMembers } from "../controllers/members.js";
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
} from "../controllers/projects.js";
import checkAuthMiddelware from "../middelware/checkAuth.js";

const router = Router();

router.post("/add-member", upload.single("profilePic"), addMembers);
router.get("/get-members", fetchMembers);


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
router.post("/add-project", upload.single("image"), addProject);

router.get("/get-projects", getProjects);

router.get("/get-project/:id", getProjectById);

export default router;
