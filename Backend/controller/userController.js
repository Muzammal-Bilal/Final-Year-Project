import { catchAsyncErrors } from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    password,
    gender,
    role,
    docAvatar,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !password ||
    !gender ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    password,
    gender,
    role,
    docAvatar,
    doctorDepartment,
  });
  generateToken(user, "User Registered Successfully!", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please provide all details", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and confirm Passowrd do not match", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or Password", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or Password", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }
  generateToken(user, "User logged in Successfully!", 200, res);
});

export const AddnewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, password, gender } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !password ||
    !gender
  ) {
    return next(new ErrorHandler("Please Fill Full Form", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler(`${isRegistered.role} with this email already exists!`));
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    password,
    gender,
    role: "Admin",
  });
  res.status(200).json({
    success:true,
    message:"New Admin Registered!"
  })
});

export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
  const doctors=await User.find({role:"Doctor"});
  res.status(200).json({
    success:true,
    doctors
  })
})

export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
  const user=req.user;
  res.status(200).json({
    success:true,
    user
  })
})

export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
res.status(200).cookie("adminToken","",{
  httpOnly:true,
  expires:new Date(Date.now())
}).json({
  success:true,
  message:"Admin logged out successfully"
})
})


export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
  res.status(200).cookie("patientToken","",{
    httpOnly:true,
    expires:new Date(Date.now())
  }).json({
    success:true,
    message:"Patient logged out successfully"
  })
  })