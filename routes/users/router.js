/**
 * Regroupe toutes les fonction lié au user
 */
const express = require("express");
const router = express.Router();

const checkToken = require("../../middlewares/checkToken");

const auth = require("./auth");
const addUser = require("./addUser");
const editUserData = require("./editUserData");
const getAllUsers = require("./getAllUsers");

router.post("/auth", auth);
router.post("/add", addUser);
router.put("/edit", checkToken, editUserData);
router.get("/", checkToken, getAllUsers);

module.exports = router;