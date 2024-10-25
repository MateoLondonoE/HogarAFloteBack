import { Router } from "express";
import usuarioRoutes from "./usuario.routes.js"

const router = Router();

router.use("/usuario", usuarioRoutes);

export default router;