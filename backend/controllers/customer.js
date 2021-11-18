import customer from "../models/customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerCustomer = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const existinCustomer = await customer.findOne({ name: req.body.name });
  if (existinCustomer)
    return res.status(400).send({ message: "The customer already exist" });

  const hash = await bcrypt.hash(req.body.password, 10);

  const customerSchema = new customer({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    dbStatus: true,
  });

  const result = await customerSchema.save();
  if (!result)
    return res.status(400).send({ message: "Failed to register customer" });
  return res.status(200).send({ result });
};

const listCustomer = async (req, res) => {
  const customerSchema = await customer.find();
  if (!customerSchema || listCustomer.length == 0)
    return res.status(400).send({ message: "Empty customer list" });
  return res.status(200).send({ customerSchema });
};

const updateCustomer = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    const customerFind = await user.findOne({ email: req.body.email });
    pass = customerFind.password;
  }

  const existinCustomer = await customer.findOne({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  if (existinCustomer)
    return res.status(400).send({ message: "The customer already exist" });

  const customerUpdate = await customer.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  if (!customerUpdate)
    return res.status(400).send({ message: "Error editing customer" });
  return res.status(200).send({ customerUpdate });
};

const deleteCustomer = async (req, res) => {
  const customerDelete = await customer.findByIdAndDelete({
    _id: req.params["_id"],
  });

  if (!customerDelete) res.status(400).send({ message: "Customer no found" });
  return res.status(200).send({ message: "Customer deleted" });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const userLogin = await customer.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  const hash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!hash)
    return res.status(400).send({ message: "Wrong email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          
          email: userLogin.email,
          password: userLogin.password,
          iat: moment().unix(),
        },
        process.env.SECRE_KEY_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Login error" });
  }
};

export default {
  registerCustomer,
  listCustomer,
  updateCustomer,
  deleteCustomer,
  login,
};
