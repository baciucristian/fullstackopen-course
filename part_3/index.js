const express = require('express');
const app = express();

app.use(express.json());

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

app.get('/', (req, res) => {
  res.send('<h1>Welcome to phonebook API!</h1>');
});

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
