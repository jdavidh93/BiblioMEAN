import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const customer = mongoose.model("customer", customerSchema);

export default customer;

//name, email, password, registerDate, dbStatus