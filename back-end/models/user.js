const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    own_finished_protocols: [String],
    id_last_opened_protocol: String,
    permission: [String],
    statistics_permission: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema, "users");
