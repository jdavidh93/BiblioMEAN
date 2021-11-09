import mongoose from "mongoose";

const vendorsSchema = new mongoose.Schema({
  name: String,
  address: String,
  registerDate: { type: Date, default: Date.now },
});

const vendors = mongoose.model("vendors", vendorsSchema);

export default vendors;

//name, address, registerDate.