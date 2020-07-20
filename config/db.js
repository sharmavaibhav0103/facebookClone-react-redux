const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
    try {
        await mongoose.connect(
            config.get("mongoURI"),
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
                useCreateIndex: true
            },
            () => console.log('Connected to the database')
        );
    }
    catch(err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

module.exports = connectDB;