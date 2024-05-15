const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

const { updateUserRole, deleteUserRole } = require("../controllers/UserRole");

//**modification d'utilisateur */
router.put("/updateUserRole/:id", isAuth, updateUserRole);

/**effacer role */
router.put("/deleteUserRole/:id", isAuth, deleteUserRole);

module.exports = router;
