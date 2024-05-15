const User = require("../models/User");
const UserRole = require("../models/UserRole");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**inscription des tout les utilisateurs */
const registerUser = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const data = req.body;
    const usr = new User(data);
    const salt = bcrypt.genSaltSync(10);
    const cryptedPassword = bcrypt.hashSync(data.password, salt);
    usr.password = cryptedPassword;
    const savedUser = await usr.save();

    req.user = savedUser;
    req.role = userCount === 0 ? "Admin" : "User";
    next();
  } catch (error) {
    res.status(500).send("Error while registering: " + error);
  }
};

/**login */
const loginUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(404).send("Email or Password invalid!!!");
    }

    const validPass = bcrypt.compareSync(data.password, user.password);
    if (!validPass) {
      return res.status(401).send("Email or Password invalid!!!");
    }

    const userRole = await UserRole.findOne({ userId: user._id });
    if (!userRole) {
      return res.status(404).send("User role not found");
    }

    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: userRole.role,
    };

    const token = jwt.sign(payload, "0123");
    res.status(200).send({ myToken: token });
  } catch (error) {
    res.status(500).send(error);
  }
};

/**affichage des tout les utilisateurs */
const getUser = async (req, res) => {
  try {
    users = await User.find();
    res.send(users);
  } catch (error) {}
};

/**modification d'utilisateur */
const updateUser = async (req, res) => {
  try {
    myId = req.params.id;
    data = req.body;
    newUser = await User.findByIdAndUpdate({ _id: myId }, data);
    res.send(newUser);
  } catch (error) {}
};

/**affichage d'utilisateur selon ID */
const getOneUser = async (req, res) => {
  try {
    myId = req.params.id;
    user = await User.findById({ _id: myId });
    res.send(user);
  } catch (error) {}
};

/**effacer un utilisateur */
const deleteUser = async (req, res) => {
  try {
    myId = req.params.id;
    user = await User.findByIdAndDelete({ _id: myId });
    res.status(200).send(user);
  } catch (error) {}
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  getOneUser,
  deleteUser,
};
