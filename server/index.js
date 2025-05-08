const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// ✅ Dynamic CORS origin setup for development and production
const allowedOrigins = [
  "http://localhost:3000",                     // local frontend
  "https://your-frontend-name.netlify.app",    // your deployed frontend (adjust as needed)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed from this origin"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Support preflight for all routes
app.options("*", cors());

app.use(express.json());

// ✅ DB config
const config = require("./db/config");

// ✅ Middleware and route files
const verifyToken = require("./Middleware/middleware");
const Home = require("./controllers/controller");
const LoginRoute = require("./routes/LoginRoute");
const RegisterRoute = require("./routes/RegisterRoute");
const RecipeRoute = require("./routes/RecipeRoute");
const ForgotPassword = require("./routes/forgotPassword");

// ✅ Auth routes
app.use("/auth", LoginRoute);
app.use("/auth", RegisterRoute);
app.use("/auth", RecipeRoute);
app.use("/auth", ForgotPassword);

// ✅ Protected Home route
app.get("/auth", verifyToken, Home.Home);

// ✅ Start the server
if (config) {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Started on port ${process.env.PORT || 5000}`);
  });
}
