const mongoose = require("mongoose");
const ModeratorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Moderator = mongoose.model("Moderator", ModeratorSchema);
module.exports = Moderator;
