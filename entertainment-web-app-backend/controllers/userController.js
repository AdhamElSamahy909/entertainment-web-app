const User = require("../models/userModel");

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new Error("No user found with that id"));
  }

  res.status(200).json({ status: "success", user });
};
