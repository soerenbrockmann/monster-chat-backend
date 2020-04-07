import MongoClient from 'mongodb';

const url = 'mongodb://localhost/playground';
const dbname = 'playground';

MongoClient.connect(url)
  .then(client => {
    const db = client.db(dbname);
    const collection = db.collection('pizza');
    //   collection.insertOne({ name: 'Hawai Pizza', size: 'XXL' });
    //   collection.insertOne({ name: 'Hawai Pizza', size: 'XL' });
    //   collection.insertOne({ name: 'Funghi Pizza', size: 'XXL' });
    //   collection.insertOne({ name: 'Ham Pizza', size: 'XXL' });
    collection
      .find({})
      .toArray((err, docs) => {
        console.log(docs);

        const res = docs.filter(pizza => pizza.name === 'Hawai Pizza' && pizza.size === 'XL');
        res.forEach(pizza => {
          collection.update({ _id: pizza._id }, { $set: { size: 'XXL' } });
        });
      })
      .then(() => {
        collection
          .find({})
          .toArray()
          .then((err, docs) => {
            const res = docs.filter(pizza => pizza.name !== 'Hawai Pizza');
            res.forEach(pizza => {
              collection.remove({ _id: pizza._id });
            });
          });
      })
      .then(() => {
        collection
          .find({})
          .toArray()
          .then((err, docs) => console.log(docs));
      });
  })
  .catch(err => console.log(err));
