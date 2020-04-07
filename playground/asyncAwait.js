import MongoClient from 'mongodb';

const url = 'mongodb://localhost/playground';
const dbname = 'playground';

async function Pizza() {
  const client = await MongoClient.connect(url);
  const db = client.db(dbname);
  const collection = db.collection('pizza');
  // collection.insertOne({ name: 'Hawai Pizza', size: 'XXL' });
  // collection.insertOne({ name: 'Hawai Pizza', size: 'XL' });
  // collection.insertOne({ name: 'Hawai Pizza', size: 'XL' });
  // collection.insertOne({ name: 'Hawai Pizza', size: 'XL' });
  // collection.insertOne({ name: 'Funghi Pizza', size: 'XXL' });
  // collection.insertOne({ name: 'Ham Pizza', size: 'XXL' });

  // Step 1
  const allPizza = await collection.find({}).toArray();
  const filteredPizza = allPizza.filter(pizza => pizza.name === 'Hawai Pizza' && pizza.size === 'XXXXXL');

  const pizzaPromises = filteredPizza.map(pizza => {
    collection.update({ _id: pizza._id }, { $set: { size: 'L' } });
  });

  Promise.all(pizzaPromises);

  // Step 2
  const allPizza2 = await collection.find({}).toArray();
  console.log(allPizza2);
}

Pizza();
