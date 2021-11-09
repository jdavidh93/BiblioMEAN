import vendors from "../models/vendors.js";

const registerVerdors = async (req, res) => {
  if (!req.body.name || !req.body.address)
    return res.status(400).send("Incomplete data");

  const existinVendors = await vendors.findOne({ name: req.body.name });
  if (existinVendors) return res.status(400).send("The vendors already exist");

  const vendorsSchema = new vendors({
    name: req.body.name,
    address: req.body.address,
  });

  const result = await vendorsSchema.save();
  if (!result) return res.status(400).send("Failed yo register vendors");
  return res.status(200).send({ result });
};

const listVendors = async (req, res) => {
  const vendorsSchema = await vendors.find();
  if (!vendorsSchema || vendorsSchema.length == 0)
    return res.status(400).send("Empty vendors list");
  return res.status(200).send({ listVendors });
};

const updateVendors = async (req, res) => {
  if (!req.body.name || !req.body.address)
    return res.status(400).send("Incomplete data");

  const existinVendors = await vendors.findOne({
    name: req.body.name,
    address: req.body.address,
  });
  if (existinVendors) return res.status(400).send("The vendors already exist");

  const vendorsUpdate = await vendors.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    address: req.body.address,
  });
  if (!vendorsUpdate) return res.status(400).send("Error editing book");
  return res.status(200).send({ vendorsUpdate });
};

const deleteVendors = async (req, res) => {
  const vendorsDelete = await vendors.findByIdAndDelete({_id: req.params["_id"]});

  if (!vendorsDelete) res.status(400).send("Vendors no found");
  return res.status(200).send("Vendors deleted");
};

export default { registerVerdors, listVendors, updateVendors, deleteVendors };
