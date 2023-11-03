const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
  {
    First_name: {
      type: String,
      require: [true, "name must be provided"],
    },
    Last_name: {
      type: String,
      require: [true, "name must be provided"],
    },
    email: {
      type: String,
      required: [true, "email must be provided"],

      match: [/^[\w.-]+@MinT\.gov\.et$/, "please provide valid email"],
      unique: true,
    },
    position: {
      type: String,
      required: [true, "position must be provided"],
      enum: ["CEO", "DESK", "EXPERT"],
      default: "EXPERT",
    },
    password: {
      type: String,
      require: [true, "password must be provided"],
    },
    department: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["staff", "staff-manager", "transport-manager", "admin"],
      default: "staff",
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },

  },
  { timestamps: true }
);

 
  UserSchema.pre('save',async function(next){
    const salt =await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    if (!this.isModified("password")) return next();
})


UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

module.exports=mongoose.model('User',UserSchema)
