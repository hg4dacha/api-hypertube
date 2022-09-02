const User = require("../schemas/User");

/**
 * Fonctions de verification des champs du user avant qu'il ne soit ajouté en base de données
 */

module.exports = {

    lastname: data => {
        if (!data || data === "") return "MISSING_LASTNAME";
        if (data.length < 1 || data.length > 30) return "LENGTH_LASTNAME";
        return null;
    },

    firstname: data => {
        if (!data || data === "") return "MISSING_FIRSTNAME" ;
        if (data.length < 1 || data.length > 30) return "LENGTH_FIRSTNAME" ;
        return null;
    },

    username: async data => {
        if (!data || data === "") return "MISSING_USERNAME";
        if (data.length < 1 || data.length > 30) return "LENGTH_USERNAME";
        // Check pattern
        const usernamePattern = /^[a-zA-Z0-9-]{1,15}$/;
        if (!usernamePattern.test(data)) return "INVALID_USERNAME";
        // Check en bdd si le username existe
        const doesUserExist = await User.find({ username: data.toLowerCase() });
        if (doesUserExist) return "ALREADY_REGISTERED_USERNAME";
        return null;
    },

    email: async data => {
        if (!data || data === "") return "MISSING_MAIL";
        // Check pattern
        const mailPattern = /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+))|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,})){1,255}$/;
        if (!mailPattern.test(data)) return "INVALID_EMAIL";
        // Check en bdd si l'email existe
        const result = await User.find({ email: data.toLowerCase() });
        if (result) return "ALREADY_REGISTERED_EMAIL";
        return null;
    },

    password: data => {
        if (!data || data === "") return "MISSING_PASSWORD";
        // Check pattern
        const pwdPattern = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z0-9])(?!.\s).{6,255}$/;
        if (!pwdPattern.test(data)) return "INVALID_PASSWORD";
        return null;
    }
};