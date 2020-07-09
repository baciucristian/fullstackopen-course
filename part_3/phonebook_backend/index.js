const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data'),
);
morgan.token('data', req => JSON.stringify(req.body));

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'Cristian Baciu',
    number: '067124495',
    id: 5,
  },
  {
    name: 'Bianca Baciu',
    number: '061823490',
    id: 6,
  },
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
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
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
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
