import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Accepts some content and adds it to the database
export const putDb = async (content) => {
  // open the connection to the database
  const db = await openDB('jate', 1)

  // create a transaction and set the permissions for the transaction
  const tx = db.transaction('jate', 'readwrite')

  // select the store we want to make a request from
  const store = tx.objectStore('jate')

  // use the .add() method to pass in the content
  const request = store.put({id: 1, content: content})

  // Confirm the request was successful
  const result = await request
  console.log('Data saved', result)
}

// Gets all the content from the database
export const getDb = async () => {
  // open the connection to the database
  const db = await openDB('jate', 1)

  // create a transaction and set the permissions for the transaction
  const tx = db.transaction('jate', 'readonly')

  // select the store we want to make a request from
  const store = tx.objectStore('jate')

  // use getAll to retrieve all entries in the jate store
  const request = store.getAll()

  const result = await request
  console.log('result.value', result)

  return result
};

initdb();
