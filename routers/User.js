const express = require("express");

const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const isAuth = require("../middleware/isAuth");

const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  getOneUser,
  deleteUser,
} = require("../controllers/User");

const { registerUserRole } = require("../controllers/UserRole");

//**register */
router.post("/register", isAuth, registerUser, registerUserRole);

/**login  */
router.post("/login", isAuth, loginUser);

//**modification d'utilisateur */
router.put("/updateUser/:id", isAuth, updateUser);
//**affichage d'utilisateur */
router.get("/getUser", isAuth, getUser);
/**affichage a traver ID */
router.get("/getUser/:id", isAuth, getOneUser);

//**effacer l'utilisateur */
router.delete("/deleteUser/:id", isAuth, deleteUser);

module.exports = router;
