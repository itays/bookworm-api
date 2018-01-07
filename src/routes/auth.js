import express from "express";
import User from "../models/User";
const router = express.Router();

router.post("/", (req, res) => {
  const { credentials } = req.body;
});

export default router;
