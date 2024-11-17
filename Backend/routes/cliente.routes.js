import { Router } from "express";
import { deleteCita, getAllCitas, getCitaById, newCita, updateCita } from "../controllers/cliente.controller.js";

const router = Router()

router.post("/cita", newCita)
router.get("/citas/:id", getAllCitas)
router.get("/cita/:id", getCitaById)
router.delete("/cita/:id", deleteCita)
router.put("/cita/:id", updateCita)

export default router;