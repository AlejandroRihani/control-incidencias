import AppDataSource  from "./data-source";
import express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import { userRouter } from "./routes/user.routes";
import incidenciasRoutes from "./routes/incidencias.routes";
import trabajadoresRoutes from "./routes/trabajador.routes";
import posicionRoutes from "./routes/posicion.routes";
import nivelRoutes from "./routes/nivel.routes";
import horarioRoutes from "./routes/horario.routes";
import tipoIncidenciaRoutes from "./routes/tipoIncidencia.routes";

dotenv.config();
 
const app = express();
app.use(express.json());
const { PORT = 3000 } = process.env;

app.use("/auth", userRouter);
app.use("/trabajadores", trabajadoresRoutes);
app.use("/incidencias", incidenciasRoutes);
app.use("/posicion", posicionRoutes);
app.use("/nivel", nivelRoutes);
app.use("/horario", horarioRoutes);
app.use("/tipoIncidencia", tipoIncidenciaRoutes); 

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Servidor corriendo en http://localhost:" + PORT);
    });
    console.log("¡Base de datos inicializada!");
  })
  .catch((error) => console.log(error));
