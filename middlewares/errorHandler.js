module.exports = (err, req, res, next) => {
  console.error("ERror:", err.stack);
  res.status(500).json({
    status: "error",
    message: err.message || "Something went wrong!",
  });
};
