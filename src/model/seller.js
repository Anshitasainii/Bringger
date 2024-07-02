const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let answer = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    mobile: {
      type: Number,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    otp: {
      type: Number,
      default: null,
    },
    GST_No: {
      type: Number,
      default: null,
    },
    PAN_No: {
      type: Number,
      default: null,
    },
     img: {
      type: String,
      default: null,
    },
    auth_key: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: "",
  }
);
module.exports = mongoose.model("seller", answer);
