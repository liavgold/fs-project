const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: {
      type: string,
      required: true,
    },
    content: {
      type: string,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamp: true });
module.exports = mongoose.model("User", userSchema);
