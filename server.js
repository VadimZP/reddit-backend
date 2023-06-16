const { app, db } = require("./app");
const { serverPort } = require("./config");

const register = require("./routes/register");
const login = require("./routes/login");
const users = require("./routes/users");
const posts = require("./routes/posts");
const search = require("./routes/search");

app.use("/register", register);
app.use("/login", login);
app.use("/users", users);
app.use("/posts", posts);
app.use("/search", search);

// function errorHandler(err, req, res, next) {
//   res.status(500).json({ message: "Server error" });
// }

// app.use(errorHandler);

app.listen(serverPort, () => {
  console.log(`App is listening on port ${serverPort}`);
});
