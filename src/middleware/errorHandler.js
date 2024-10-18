const errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  if (err.isJoi) {
    err.status = 422;
  }
  res.status(err.status || 400).json({
    code: err.status || 400,
    error_code: err.status || 400,
    error: {
      message: err.message,
      reason: JSON.stringify(err.details || {}),
    },
  });
};

module.exports = errorHandler;
