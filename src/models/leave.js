const { Schema, model } = require("mongoose");

const leaveSchema = new Schema({
  ChannelID: {
    type: String,
  },
  Txt: {
    type: String,
  },
  GuildID: String,
});

module.exports = new model("LeaveMessages", leaveSchema);
