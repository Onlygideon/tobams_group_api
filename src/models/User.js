const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: "Password is required",
      minlength: [8, "Password should not be less than 8 characters"],
    },
  },
  { timestamps: true, collection: "Users" }
);

module.exports = mongoose.model("User", UserSchema);
