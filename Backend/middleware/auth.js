const { UnAuthorizedError } = require("../error");
const jwt=require('jsonwebtoken')
const auth = async (req, res, next) => {
    const {authorization}=req.headers;
    console.log('authorization',authorization)
    if(!authorization || ! authorization.startsWith('Bearer ')){
     throw new UnAuthorizedError('access denied');

    }

    const token=authorization.split(' ')[1];
    const decoded=await jwt.verify(token,process.env.JWT_SECRET)
     
    
req.user=decoded
next()
};

const verifyTokenAndAdmin = (req, res, next) => {
  auth(req, res, () => {
    const { isAdmin } = req.user;
    if (isAdmin) {
      next();
    } else {
      throw new UnAuthorizedError("access denied");
    }
  });
};
const verifyTokenAndAuth = (req, res, next) => {
  auth(req, res, () => {
    const { userID, isAdmin } = req.user;
    const { id } = req.params;
    if (id === userID || isAdmin) {
      next();
    } else {
      throw new UnAuthorizedError("access denied");
    }
  });
};
module.exports = { auth, verifyTokenAndAdmin, verifyTokenAndAuth };