const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("PostInfo", postSchema);
