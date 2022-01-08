const mongoose = require("mongoose");
require('dotenv').config({path: 'variable.env'});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database...");
    }
    catch (error) {
        console.log(error);
        process.exit(1);        // Se detiene la app en caso de error
    }
}

module.exports = connectDB;