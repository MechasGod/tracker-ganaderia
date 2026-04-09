const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: "Recurso no encontrado",
      code: "NOT_FOUND",
      details: [],
    },
  });
};

module.exports = notFound;
