const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    own_finished_protocols: [String],
    id_last_opened_protocol: String,
    permission: Number,
    statistics_permission: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema, "users");
