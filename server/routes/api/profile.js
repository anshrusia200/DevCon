const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { route } = require("./user");
const { check, validationResult } = require("express-validator");
const request = require("request");

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    ); // also bring name and avatar from user into the profile variable
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no  profile available for this user" });
    }
    return res.json(profile);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Server error");
  }
});

const validations_profile = [
  check("status", "Status is required").notEmpty(),
  check("skills", "Skills is required").notEmpty(),
];

router.post("/", auth, validations_profile, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  /************************
   * BUILD PROFILE OBJECT *
   ************************/

  const profileFields = {};
  profileFields.user = req.user.id;

  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  /*******************************
   * BUILD SOCIAL PROFILE OBJECT *
   *******************************/

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (twitter) profileFields.social.twitter = twitter;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: profileFields,
        },
        { new: true }
      );
      return res.json(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (e) {
    if (e.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    //Remove Profile of the user
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Removed " });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

const validations_experience = [
  check("title", "Title is required").notEmpty(),
  check("company", "Company is required").notEmpty(),
  check("from", "From date is required").notEmpty(),
];

router.put("/experience", auth, validations_experience, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp); // unshift pushes from front

    await profile.save();
    res.json(profile);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    if (removeIndex == -1) {
      return res.json("Experience not found");
    }

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json("exp removed");
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

const validations_education = [
  check("school", "School is required").notEmpty(),
  check("degree", "Degree is required").notEmpty(),
  check("fieldofstudy", "Field of study date is required").notEmpty(),
  check("from", "From date is required").notEmpty(),
];

router.put("/education", auth, validations_education, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu); // unshift pushes from front

    await profile.save();
    res.json(profile);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    if (removeIndex == -1) {
      return res.json("Education not found");
    }

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json("edu removed");
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUBCLIENTID}&client_secret=${process.env.GITHUBSECRET}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
