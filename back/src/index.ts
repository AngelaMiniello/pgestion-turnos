import "dotenv/config";
import "reflect-metadata";

import { AppDataSource } from "./config/data-source";
import server from "./server";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Conexión a la base de datos realizada con éxito");

    server.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar DB:", error);
  });