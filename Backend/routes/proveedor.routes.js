import { Router } from "express";
import { deleteServicioById, getAllServicios, getServicioById, newServicio, updateServicio } from "../controllers/proveedor.controller.js";

const router = Router()

router.post("/", newServicio)
router.get("/:id", getAllServicios)
router.get("/servicio/:id", getServicioById)
router.delete("/:id", deleteServicioById)
router.put("/:id", updateServicio)

export default router;