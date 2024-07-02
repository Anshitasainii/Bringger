const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectId;

let answer = new Schema(
  {
    seller_id: ObjectId,

    p_name: {
      type: String,
      default: "no name",
    },

    p_price: {
      type: Number,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    Quantity: {
      type: Number,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    p_image: {
      type: String,
      default: null,
    },


  },
  {
    timestamps: true,
    versionKey: "",
  }
);
module.exports = mongoose.model("product", answer);
