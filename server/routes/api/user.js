const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const { sendWelcomeEmail } = require("../../utils/emails");

//express validator rules
const validations = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

// register user
router.post("/", validations, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;

  // see if user exists
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
    const token_verify_email = jwt.sign(
      payload,
      process.env.JWT_SECRET + user.status,
      { expiresIn: "1d" }
    );
    const verify_link =
      req.headers.origin + `/verified-email?verifyCode=${token_verify_email}`;
    sendWelcomeEmail(user.name, user.email, verify_link);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
});

router.put("/draft", auth, async (req, res) => {
  const { title, text } = req.body;
  // const newDraft = {
  //   title,
  //   text,
  // };
  try {
    const user = await User.findById(req.user.id).select("-password");
    user.draft.title = title;
    user.draft.text = text;
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send("Could not save draft");
  }
});

// router.put("/send-connection", auth, async (req, res) => {
//   const { connectId } = req.body;
//   const newConnection = {
//     user: connectId,
//     status: "pending",
//   };
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     user.connections.;
//   } catch {}
// });

module.exports = router;
