const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>',
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://admin:${password}@phonebook.8aayk.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    console.log('phonebook:');
    persons.forEach(person => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
} else {
  const inputName = process.argv[3];
  const inputNumber = process.argv[4];

  const person = new Person({
    name: inputName,
    number: inputNumber,
  });

  person.save().then(() => {
    console.log(`Added ${inputName} number ${inputNumber} to phonebook!`);
    mongoose.connection.close();
  });
}
