import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("Post to the database");
  //Create a connection to the db and version we want to use
  const jateDb = await openDB("jate", 1);
  //Create a new transaction and specify the db and data privileges
  const tx = jateDb.transaction("jate", "readwrite");
  //Open up the desired object store
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  //Get confirmation of the request
  const result = await request;
  console.log("🚀 - data saved to the database", result.value);
};

export const getDb = async () => {
  console.log("GET from the database");
  //Create a connection to the db and version we want to use
  const jateDb = await openDB("jate", 1);
  //Create a new transaction and specify the db and data privileges
  const tx = jateDb.transaction("jate", "readonly");
  //Open up the desired object store
  const store = tx.objectStore("jate");
  const request = store.get(1);
  //Get confirmation of the request
  const result = await request;
  result 
  ? console.log("data was retrieved from the DB", result.value)
  : console.log("data was NOT retrieved from the DB")
  // console.log("result.value", result);
  return result?.value;
};

initdb();
