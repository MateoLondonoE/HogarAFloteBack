import { Router } from "express";
import { deleteServicioById, getAllCitas, getAllServicios, getCitaById, getServicioById, newServicio, updateServicio } from "../controllers/proveedor.controller.js";
import { deleteCita, updateCita } from "../controllers/cliente.controller.js";

const router = Router()

//rutas de servicios
router.post("/servicio", newServicio)
router.get("/servicios/:id", getAllServicios)
router.get("/servicio/:id", getServicioById)
router.delete("/servicio/:id", deleteServicioById)
router.put("/servicio/:id", updateServicio)

//rutas de citas
router.get("/citas/:id", getAllCitas)
router.get("/cita/:id", getCitaById)
router.delete("/cita/:id", deleteCita)
router.put("/cita/:id", updateCita)

export default router;