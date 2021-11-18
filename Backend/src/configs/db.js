const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb+srv://abhishek-hero:mahabharat@project-edutech.uyk3o.mongodb.net/project-edutech")
}