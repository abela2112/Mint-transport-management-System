const { StatusCodes } = require("http-status-codes");
const { UnAuthorizedError } = require("../error");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log("authorization", authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnAuthorizedError("access denied"));
  }

  const token = authorization.split(" ")[1];
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  console.log("decoded", decoded);
  req.user = decoded;
  next();
};

const verifyTokenAndAdmin = async (req, res, next) => {
  auth(req, res, () => {
    const { role } = req.user;
    if (role === "admin") {
      next();
    } else {
      next(new UnAuthorizedError("access denied you are not admin"));
    }
  });
};

const verifyTokenAndAccessToRequest = async (req, res, next) => {
  auth(req, res, () => {
    const { role, userID } = req.user;
    const { id } = req.params;
    if (
      role === "transport-manager" ||
      role === "staff-manager" ||
      id === userID
    ) {
      next();
    } else {
      next(new UnAuthorizedError("access denied "));
    }
  });
};
const verifyTokenAndAccessToTransportManager = async (req, res, next) => {
  auth(req, res, () => {
    const { role, userID } = req.user;
    const { id } = req.params;
    if (
      role === "transport-manager" 
      
    ) {
      next();
    } else {
      next(new UnAuthorizedError("access denied "));
    }
  });
};
const verifyTokenAndStaffManager = async (req, res, next) => {
  auth(req, res, () => {
    const { role } = req.user;
    if (role === "staff-manager") {
      next();
    } else {
      throw new UnAuthorizedError("access denied");
    }
  });
};

const verifyTokenAndAuth = async (req, res, next) => {
  auth(req, res, () => {
    const { userID, role } = req.user;
    const { id } = req.params;
    if (id === userID || role === "admin") {
      next();
    } else {
      next(new UnAuthorizedError("access denied"));
    }
  });
};
module.exports = {
  auth,
  verifyTokenAndStaffManager,
  verifyTokenAndAdmin,
  verifyTokenAndAccessToRequest,
  verifyTokenAndAccessToTransportManager,
  verifyTokenAndAuth,
};