// const sayHello = () => console.log('Hello!');

// const doSomething = callback => {
//   console.log('Ok, I do something');
//   callback();
// };

// doSomething(sayHello);
import MongoClient from 'mongodb';
import assert from 'assert';

const url = 'mongodb://localhost/playground';
const dbname = 'playground';
const callback = (err, client) => {
  console.log('Conntcted to our server!');
  const db = client.db(dbname);
  const collection = db.collection('pizza');
  //   collection.insertOne({ name: 'Hawai Pizza', size: 'XXL' });
  //   collection.insertOne({ name: 'Hawai Pizza', size: 'XL' });
  //   collection.insertOne({ name: 'Funghi Pizza', size: 'XXL' });
  //   collection.insertOne({ name: 'Ham Pizza', size: 'XXL' });
  collection.find({}).toArray((err, docs) => {
    const res = docs.filter(pizza => pizza.name === 'Hawai Pizza' && pizza.size === 'XL');
    res.forEach(pizza => {
      collection.update({ _id: pizza._id }, { $set: { size: 'XXL' } });
    });

    collection.find({}).toArray((err, docs) => {
      const res = docs.filter(pizza => pizza.name !== 'Hawai Pizza');
      res.forEach(pizza => {
        collection.remove({ _id: pizza._id });
      });

      collection.find({}).toArray((err, docs) => console.log(docs));
    });
  });
};

// Goal: Update size of Pizza but only for Haiwai
// Delete other pizza but only when changig size was successful

MongoClient.connect(url, callback);
