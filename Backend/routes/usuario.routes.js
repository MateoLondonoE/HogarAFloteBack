import { Router } from "express";
import { deleteUsuarioById, getAllUsuarios, getUsuarioById, loginUsuario, registrarUsuario, updateUsuario} from "../controllers/usuario.controller.js";

const router = Router()

router.post('/', registrarUsuario)
router.get('/', getAllUsuarios)
router.get('/:id', getUsuarioById)
router.delete('/:id', deleteUsuarioById)
router.put('/:id', updateUsuario)
router.post('/login', loginUsuario)

export default router;