import express from "express";
import {
  AddnewAdmin,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
} from "../controller/userController.js";
import {
  isAdminauthenticated,
  isPatientauthenticated,
} from "../Middlewares/auth.js";

const UserRouter = express.Router();

UserRouter.post("/register", patientRegister);
UserRouter.post("/login", login);
UserRouter.post("/admin/addnew", isAdminauthenticated, AddnewAdmin);
UserRouter.get("/doctors", getAllDoctors);
UserRouter.get("/admin/me", isAdminauthenticated, getUserDetails);
UserRouter.get("/patient/me", isPatientauthenticated, getUserDetails);
UserRouter.get("/admin/logout", isAdminauthenticated, logoutAdmin);
UserRouter.get("/patient/logout", isPatientauthenticated, logoutPatient);
export default UserRouter;
