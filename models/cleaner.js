const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  weight: { type: String, required: true },
  description: { type: String, required: true },
  manufacturer: { type: String, required: true },
  price: { type: String, required: true },
  barcode: { type: Number, required: true },
  date: { type: Number, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model("Cleaner", postSchema);
