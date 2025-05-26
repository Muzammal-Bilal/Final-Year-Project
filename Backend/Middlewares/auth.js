import { catchAsyncErrors } from './catchAsyncErrors.js';
import ErrorHandler from "../Middlewares/errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAdminauthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    
    if (!token) {
        return next(new ErrorHandler("Admin not authenticated!", 400));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("Decoded Token:", decoded);

        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return next(new ErrorHandler("User not found in the database!", 404));
        }

        if (req.user.role !== "Admin") {
            return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
        }

        next();
    } catch (err) {
        return next(new ErrorHandler("Token is invalid or expired!", 401));
    }
});

export const isPatientauthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;

    if (!token) {
        return next(new ErrorHandler("User not authenticated!", 400));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("Decoded Token:", decoded);

        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return next(new ErrorHandler("User not found in the database!", 404));
        }

        if (req.user.role !== "Patient") {
            return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
        }

        next();
    } catch (err) {
        return next(new ErrorHandler("Token is invalid or expired!", 401));
    }
});
