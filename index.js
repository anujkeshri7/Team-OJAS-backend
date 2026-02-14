import { configDotenv } from "dotenv";
configDotenv();
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;

import express from "express";
import cors from "cors";

import memberRoute from "./routes/addMembers.js";

const app = express();


// database connection
import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Error connecting to MongoDB:", error));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", memberRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});