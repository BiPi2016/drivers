const mongoose = require('mongoose');
const mongoURI = process.env.ATLAS_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, options);
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Database connection error');
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;