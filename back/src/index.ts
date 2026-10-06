import "dotenv/config";
import "reflect-metadata";

import { AppDataSource } from "./config/data-source";
import server from "./server";
import { seedAppointments } from "./controllers/Appointment.Controller";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Conexión a la base de datos realizada con éxito");
    //await seedAppointments();

    server.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar DB:", error);
  });