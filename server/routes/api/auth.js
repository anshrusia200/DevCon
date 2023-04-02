const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { sendPasswordResetEmail } = require("../../utils/emails");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // -password will not return password

    return res.json(user);
  } catch (e) {
    return res.status(500).send("Server Error");
  }
});

const validations = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

router.post("/", validations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  // see if user exists
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "Invalid credentials" }],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "10h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

router.post("/forgot-password", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("User not found");
  }
  const secret = process.env.JWT_SECRET + user.password;
  const payload = {
    email: user.email,
    id: user.id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "30min" });

  // const ticket = token.split(".")[0];
  const resetLink =
    req.headers.origin + `/reset-password/${user.id}?resetCode=${token}`;
  sendPasswordResetEmail(resetLink, user.name, user.email);
  return res.status(200).send("email sent");
});

router.post("/reset-password", async (req, res) => {
  const { userId, token, password } = req.body;
  console.log(token);
  const user = await User.findById(userId);
  // console.log(user);
  if (!user) {
    return res.status(404).send("Invalid reset link");
  }
  console.log(user.password);
  const secret = process.env.JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(200).send("Password reset success");
  } catch (err) {
    res.status(404).send("Invalid reset link");
  }
});

module.exports = router;
