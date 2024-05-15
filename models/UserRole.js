const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin", "Responsable"],
    default: "User",
  },
});

const UserRole = mongoose.model("UserRole", userRoleSchema);

module.exports = UserRole;
