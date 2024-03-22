const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const hospitals = require("./routes/hospitals");
const auth = require("./routes/auth");
const appointments = require("./routes/appointments");

const app = express();

//body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/hospitals", hospitals);
app.use("/api/v1/auth", auth);
app.use("/api/v1/appointments", appointments);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
