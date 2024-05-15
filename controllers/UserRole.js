const bcrypt = require("bcrypt");
const UserRole = require("../models/UserRole");
const User = require("../models/User");

/**creation d'un utilisateur */
// In controllers/UserRole.js
const registerUserRole = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send("User must be registered first");
    }

    const roleData = {
      userId: req.user._id,
      role: req.role, // Use the role determined in the previous middleware
    };

    const usrRole = new UserRole(roleData);
    const savedUserRole = await usrRole.save();
    res.status(200).send({
      user: req.user,
      userRole: savedUserRole,
    });
  } catch (error) {
    res.status(500).send("Error while registering user role: " + error);
  }
};

/**changer le role d'un utilisateur */
const updateUserRole = async (req, res) => {
  try {
    const myId = req.params.id;
    const role = req.body.role;

    const validRoles = ["Admin", "User", "Responsable"];
    if (!validRoles.includes(role)) {
      return res
        .status(400)
        .send(
          "Invalid role specified. Only 'Admin', 'User', or 'Responsable' are allowed."
        );
    }

    const data = { role: role };
    const options = { new: true };

    const updatedUserRole = await UserRole.findByIdAndUpdate(
      myId,
      data,
      options
    );
    if (!updatedUserRole) {
      return res.status(404).send("UserRole not found");
    }
    res.send(updatedUserRole);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**supprimer role */
const deleteUserRole = async (req, res) => {
  try {
    const myId = req.params.id;
    const role = "User";

    const data = { role: role };

    const updatedUserRole = await UserRole.findByIdAndUpdate(myId, data);
    if (!updatedUserRole) {
      return res.status(404).send("UserRole not found");
    }
    res.send(updatedUserRole);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  registerUserRole,
  updateUserRole,
  deleteUserRole,
};
