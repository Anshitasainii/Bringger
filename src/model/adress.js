const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let answer = new Schema(
  {
    user_id: ObjectId,

    adress: {
      type: Number,
      default: "no email",
    },

  },
  {
    timestamps: true,
    versionKey: "",
  }
);
module.exports = mongoose.model("product", answer);
