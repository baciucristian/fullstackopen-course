require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data'),
);
morgan.token('data', req => JSON.stringify(req.body));

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  });
});

app.get('/info', (req, res) => {
  const length = persons.length;
  const date = new Date();

  res.write(`<p>Phonebook has info for ${length} people.</p>`);
  res.write(`<p>${date}</p>`);
  res.end();
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);

  Person.findById(id).then(person => res.json(person));
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

const generateId = () => Math.floor(Math.random() * 1000000000 + 1);

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'data missing',
    });
  }

  const hasSameName = persons.some(person => person.name === body.name);

  if (hasSameName) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
