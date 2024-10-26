import { Router } from "express";
import { deleteCita, getAllCitas, getCitaById, newCita, updateCita } from "../controllers/cliente.controller.js";

const router = Router()

router.post("/", newCita)
router.get("/:id", getAllCitas)
router.get("/cita/:id", getCitaById)
router.delete("/:id", deleteCita)
router.put("/:id", updateCita)

export default router;