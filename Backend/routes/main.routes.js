import { Router } from "express";
import usuarioRoutes from "./usuario.routes.js"
import proveedorRoutes from "./proveedor.routes.js"
import clienteRoutes from "./cliente.routes.js"

const router = Router();

router.use("/usuario", usuarioRoutes);
router.use("/proveedor", proveedorRoutes)
router.use("/cliente", clienteRoutes)

export default router;