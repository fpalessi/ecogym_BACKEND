import { Router } from "express";
import {
  loginHandler,
  profileHandler,
  registerHandler,
} from "../controllers/auth";
import { requireUser } from "../middlewares/requireAuth";
import { validateSchema } from "../middlewares/validateSchema";
import { loginSchema, registerSchema } from "../schemas/user.schema";

const router = Router();

router.post("/register", validateSchema(registerSchema), registerHandler);

router.post("/login", validateSchema(loginSchema), loginHandler);

router.get("/profile", requireUser, profileHandler);

export default router;
