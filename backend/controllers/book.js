import book from "../models/book.js";

const registerBook = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.pages ||
    !req.body.gender ||
    !req.body.price
  )
    return res.status(400).send("Imcomplete data");

  const existinBook = await book.findOne({ name: req.body.name });

  if (existinBook) return res.status(400).send("The book already exist");

  const bookSchema = new book({
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    gender: req.body.gender,
    price: req.body.price,
  });

  const result = await bookSchema.save();
  if (!result) return res.status(400).send("Failed to register book");
  return res.status(200).send({ result });
};

const listBook = async (req, res) => {
  const bookSchema = await book.find();
  if (!bookSchema || bookSchema == 0)
    return res.status(400).send("Empty book list");
  return res.status(200).send({ bookSchema });
};

//Para poder actualizar de book.
const updateBook = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.pages ||
    !req.body.gender ||
    !req.body.price
  )
    return res.status(400).send("Imcomplete data");

  const existinBook = await book.findOne({
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    gender: req.body.gender,
    price: req.body.price,
  });

  if (existinBook) return res.status(400).send("The book already exist");

  const bookUpdate = await book.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    gender: req.body.gender,
    price: req.body.price,
  });

  if (!bookUpdate) return res.status(400).send("Error editing book");
  return res.status(200).send({ bookUpdate });
};

const deleteBook = async (req, res) => {
  const bookDelete = await book.findByIdAndDelete({ _id: req.params["_id"] });

  if (!bookDelete) res.status(400).send("Book no found");
  return res.status(200).send("Book deleted");
};

export default { registerBook, listBook, updateBook, deleteBook };
