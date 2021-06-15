// grab our client with destructuring from the export in index.js
const { 
    client,
    getAllUsers,
    createUser
} = require('./index');

// new function, should attempt to create a few users
async function createInitialUsers() {
    try {
        console.log("Starting to create users...");

        const albert = await createUser({ username: 'albert', password: 'bertie99' });
        console.log(albert);
        const sandra = await createUser({ username: 'sandra', password: '2sandy4me' });
        console.log(sandra);
        const glamgal = await createUser({ username: 'glamgal', password: 'soglam' });
        console.log(glamgal);




        console.log("Finished creating users!");
    } catch(error) {
        console.error("Error creating users!");
        throw error;
    }
}


// this function should call a query which drops all tables from our database
async function dropTables() {
    try {
        console.log("Starting to drop tables...");
      await client.query(`
        DROP TABLE IF EXISTS users;
      `);
      console.log("Finished dropping tables!")
    } catch (error) {
      console.error("Error dropping tables!") // we pass the error up to the function that calls dropTables
      throw error;
    }
  }

  // this function should call a query which creates all tables for our database 
async function createTables() {
    try {
        console.log("Starting to build tables...");
        await client.query(`
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL
            );
        `);
        console.log("Finished building tables!")
    } catch (error) {
        console.error("Error building tables!") // we pass the error up to the function that calls createTables
        throw error;
    }
}

async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
        throw error;
    }
}

async function testDB() {
    try {
        // connect the client to the database, finally
        console.log("Starting to test database...");

        const users = await getAllUsers();
        console.log("getAllUsers:", users);

        console.log("Finished database tests!")
    } catch (error) {
        console.error("Error testing database!")
        throw error;
    } finally {
        // it's important to close out the client connection
        client.end()
    }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end())