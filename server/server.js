const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

/********************
 * CONNECT DATABASE *
 ********************/

connectDB();

/*******************
 * INIT MIDDLEWARE *
 *******************/
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("API running");
});

/*****************
 * DEFINE ROUTER *
 *****************/

app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
