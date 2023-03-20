
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
    console.log('database connected successfully');
  } catch (error) {
    console.log('database is not connected...');
    console.log(error);
    process.exit(1);
  }
}


module.exports = { connectDB };