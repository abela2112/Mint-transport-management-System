const { response } = require("express");
const { StatusCodes } = require("http-status-codes");
const errorHandler = async (err, req, res, next) => {
  let customError;
  if (err) {
    (customError.statusCode =
      err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR),
      (customError.msg =
        err.message || "Something went wrong please try again");
  }

  res.status(customError.statusCode).json({ message: customError.msg });
};

module.exports = errorHandler;
