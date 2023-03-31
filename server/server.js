const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const path = require("path");
const cors = require("cors");
/********************
 * CONNECT DATABASE *
 ********************/
var corsOptions = {
  origin: "https://ondevcon.netlify.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

connectDB();

/*******************
 * INIT MIDDLEWARE *
 *******************/
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// deployment setup

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
if (process.env.NODE_ENV === "production") {
  const __directory = path.resolve();
  app.use(express.static(path.join(__directory, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__directory, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API service running 🚀");
  });
}
