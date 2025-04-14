const mongoose = require("mongoose");

const DraftProtocolSchema = new mongoose.Schema({

  content: [Object]
});

module.exports = mongoose.model("DraftProtocol", DraftProtocolSchema, "draft_protocol");