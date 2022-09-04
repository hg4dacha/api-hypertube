/**
 * Regroupe toutes les fonction lié au user
 */
 const express = require("express");
 const router = express.Router();
 
 const checkToken = require("../../middlewares/checkToken");
 
 const getMovies = require("./getMovies");

 
 router.get("/", checkToken, getMovies);
 
 module.exports = router;