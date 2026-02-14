import { Router } from "express";
import { addMembers ,fetchMembers } from "../controllers/members.js";
import upload from "../config/upload.js";
import { loginUser, registerUser } from "../controllers/users.js";
import { checkAuth } from "../services.js";
import { addProject ,getProjects,getProjectById } from "../controllers/projects.js";


const router = Router();

router.post("/add-member", upload.single("profilePic"), addMembers);
router.get("/get-members", fetchMembers);



router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/check-auth', checkAuth);

router.post('/add-project',upload.single("image"), addProject);

router.get('/get-projects', getProjects);

router.get('/get-project/:id', getProjectById);


export default router;
