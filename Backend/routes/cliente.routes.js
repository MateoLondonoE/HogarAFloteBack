import { Router } from "express";
import { deleteClienteById, getAllClientes, getClienteById, registrarCliente } from "../controllers/cliente.controllers.js";

const router = Router()

router.post('/', registrarCliente)
router.get('/', getAllClientes)
router.get('/:id', getClienteById)
router.delete('/:id', deleteClienteById)

export default router;