const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
require("colors");
const User = require("../../schemas/user");
const checkUserDataService = require("../../services/checkUserData");
const sanitize = require("mongo-sanitize");




async function checkUserFields(data, req) {

    let error;
    if ((error = checkUserDataService.lastname(req.body.lastname))) return error;
    if ((error = checkUserDataService.firstname(req.body.firstname))) return error;
    if ((error = checkUserDataService.password(req.body.password))) return error;
    if ((error = await checkUserDataService.username(req.body.username))) return error;
    if ((error = await checkUserDataService.email(req.body.email))) return error;

    return null;
}


async function addUser(req, res) {
    
    let error = await checkUserFields(req.body);
    if (error) {
        return res.status(400).json({ error });
    }

    try {
        
        // var lang = req.session.language;
        // console.log(lang);
    
        // const uniqid = new Date().getTime() + Math.floor(Math.random() * 10000 + 1).toString(16);
        let password;
        bcrypt.hash(req.body.password, 10, (err, hash) => {

            if (err) return next(createError(500, err));

            password = hash;

            const user = new User({
                username: sanitize(req.body.username.toLowerCase()),
                firstname: sanitize(req.body.firstname.toLowerCase()),
                lastname: sanitize(req.body.lastname.toLowerCase()),
                email: sanitize(req.body.email.toLowerCase()),
                password,
                image: "default_image.png",
                language: sanitize(req.body.language.toLowerCase()),
                // activationKey: uniqid
            });
    
            await user.save();
            return res.status(200).json({ status: "success" });

        });
    
        
    } catch (e) {
        return next(createError(500, e.message));
    }
    
}


module.exports = addUser;