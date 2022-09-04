const createError = require("http-errors");
const axios = require("axios");





async function getMovies(req, res, next) {

    try {

        const movies = [];

        const res = await axios.get(
            `https://imdb-api.com/${req.user.language}/API/Top250Movies/${process.env.IMDB_KEY}`
        );

    }
    catch(error) {
        return next(createError(500, e.message));
    }

}

module.exports = getMovies;