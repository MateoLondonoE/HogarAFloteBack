import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import mainRouter from "./routes/main.routes.js"

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Iniciar el servidor
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}))

app.use("/api/v1", mainRouter)

app.listen(port)
    console.log("servidor corriendo en el puerto "+port)