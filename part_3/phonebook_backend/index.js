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
  Person.find({}).then(persons => {
    const length = persons.length;
    const date = new Date();

    res.write(`<p>Phonebook has info for ${length} people.</p>`);
    res.write(`<p>${date}</p>`);
    res.end();
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;

  Person.findById(id)
    .then(person => res.json(person))
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;

  Person.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'data missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    res.json(savedPerson);
  });
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
      console.log(updatedPerson);
      res.json(updatedPerson);
    })
    .catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'});
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({error: 'malformatted id'});
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
