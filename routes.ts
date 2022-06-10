import { Router, Request, Response } from "express";
import { CreateUserController } from "./src/controllers/CreateUserController";

const router = Router();

// -- ROTAS --
router.get("/", (req, res) => res.json({ ok: true }));

// -- ROTAS USER --
router.post("/user", new CreateUserController().handle);

export { router };
