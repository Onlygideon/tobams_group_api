const mongoose = require("mongoose");

const mongoLocal = "mongodb://127.0.0.1:27017/tobams_group";

const connectMongodb = async () => {
  try {
    if (process.env.DB_URL) {
      await mongoose.connect(`${process.env.DB_URL}`);
      console.log("MongoDB remote connection established");
    } else {
      await mongoose.connect(mongoLocal);
      console.log("MongoDB local connection established");
    }
  } catch (err) {
    console.log("MongoDB connection - retrying", err);

    connectMongodb();
  }
};

module.exports = connectMongodb;
