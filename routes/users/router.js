/**
 * Regroupe toutes les fonction lié au user
 */
const express = require("express");
const router = express.Router();

const checkToken = require("../../middlewares/checkToken");

const auth = require("./auth");
const addUser = require("./addUser");
const getUserImage = require('./getUserImage');

router.post("/auth", auth);
router.post("/add", addUser);
router.get("/image", checkToken, getUserImage);

module.exports = router;
