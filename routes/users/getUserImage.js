const path = require("path");




async function getUserimage(req, res, next) {

    try {

        const user = req.user;
        const pathLogo = `${path.resolve("../../user_images/")}${user.image}`;
        res.sendFile(pathLogo, {}, (err) => { if (err) return next(createError(500, "Error to get image.")) });
        
    } catch (error) {
        return next(createError(500, e.message));
    }


}

module.exports = getUserimage;