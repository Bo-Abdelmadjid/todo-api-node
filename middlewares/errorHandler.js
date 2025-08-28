module.exports = (err, req, res, next) => {
  console.error(err);
  const status = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(status).json({
    error: err.message || "SErver error",
  });
};
