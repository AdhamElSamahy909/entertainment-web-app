const express = require("express");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const verifyJwt = require("../middleware/verifyJwt");

const router = express.Router();

// router.get("/");
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", userController.getMe, userController.getUser);

module.exports = router;
