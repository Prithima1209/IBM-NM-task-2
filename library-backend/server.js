const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/libraryDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  publishedYear: Number,
  availableCopies: Number
});

const Book = mongoose.model('Book', bookSchema);

// CREATE
app.post('/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.send(book);
});

// READ ALL
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// READ ONE
app.get('/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.send(book);
});

// UPDATE
app.put('/books/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(book);
});

// DELETE
app.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.send({ message: "Book"})
});