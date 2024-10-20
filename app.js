const express = require("express");
const app = express();

const accountRoute = require("./routes/accountRoute");
const transactionRoute = require("./routes/transactionRoute");
const staffRoute = require("./routes/staffRoute");
const studentRoute = require("./routes/studentRoute");
const classRoute = require("./routes/classRoute");
const teacherRoute = require("./routes/teacherRoutes");

const userRoute = require("./routes/userRoute");

const adminRoute = require("./routes/adminRoute");

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use("/api/v3/account", accountRoute);
app.use("/api/v3/admin", adminRoute);
app.use("/api/v3/transaction", transactionRoute);
app.use("/api/v3/staff", staffRoute);
app.use("/api/v3/student", studentRoute);
app.use("/api/v3/class", classRoute);
app.use("/api/v3/teacher", teacherRoute);
app.use("/api/v3/user", userRoute);

module.exports = app;
