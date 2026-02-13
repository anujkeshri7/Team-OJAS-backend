import { Router } from "express";
import { addMembers ,fetchMembers } from "../controllers/members.js";
import upload from "../config/upload.js";


const router = Router();

router.post("/add-member", upload.single("profilePic"), addMembers);
router.get("/get-members", fetchMembers);

export default router;
