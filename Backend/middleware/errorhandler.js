
const { StatusCodes } = require("http-status-codes");
const errorHandler = async (err, req, res, next) => {
  console.log(err);
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  res.status(customError.statusCode).json({ message: customError.msg });
};

module.exports = errorHandler;
