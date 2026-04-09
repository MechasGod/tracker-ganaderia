const app = require("./app");
const env = require("./config/env");
const connectDB = require("./config/db");

const bootstrap = async () => {
  // await connectDB();

  app.listen(env.port, () => {
    console.log(`Servidor escuchando en puerto ${env.port}`);
  });
};

bootstrap();
