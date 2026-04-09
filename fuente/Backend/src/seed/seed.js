const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const Usuario = require("../models/User");
const Animal = require("../models/Animal");

const seed = async () => {
  await connectDB();

  const adminEmail = "admin@finca.com";
  const plainPassword = "admin123";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await Usuario.updateOne(
    { email: adminEmail },
    {
      $set: {
        email: adminEmail,
        password: hashedPassword,
        nombre: "Administrador Principal",
        rol: "admin",
      },
    },
    { upsert: true }
  );

  const animales = [
    {
      identificacion: "001-2024",
      nombre: "Luna",
      raza: "holstein",
      sexo: "hembra",
      fechaNacimiento: "2023-03-15",
      peso: 450.5,
      estado: "activo",
    },
    {
      identificacion: "002-2024",
      nombre: "Thor",
      raza: "brahman",
      sexo: "macho",
      fechaNacimiento: "2022-11-20",
      peso: 520.0,
      estado: "activo",
    },
    {
      identificacion: "003-2024",
      nombre: "Bella",
      raza: "angus",
      sexo: "hembra",
      fechaNacimiento: "2023-06-10",
      peso: 380.0,
      estado: "activo",
    },
  ];

  for (const animal of animales) {
    await Animal.updateOne(
      { identificacion: animal.identificacion },
      { $set: animal },
      { upsert: true }
    );
  }

  console.log("Seed ejecutado correctamente");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Error ejecutando seed:", error.message);
  process.exit(1);
});
