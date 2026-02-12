import { Router } from "express";
import { addMembers ,fetchMembers } from "../controllers/members.js";

const router = Router();

router.post("/add-member", addMembers);
router.get("/get-members", fetchMembers);

export default router;
