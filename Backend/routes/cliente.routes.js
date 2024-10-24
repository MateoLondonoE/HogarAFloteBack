import { Router } from "express";
import { getAllClientes, registrarCliente } from "../controllers/cliente.controllers.js";

const router = Router()

router.post('/', registrarCliente)
router.get('/', getAllClientes)

export default router;