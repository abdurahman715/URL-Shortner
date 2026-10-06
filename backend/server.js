import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
app.get("/", (req, res) => {
  res.send("Hello world");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
