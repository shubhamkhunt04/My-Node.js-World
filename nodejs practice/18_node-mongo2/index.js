const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);


    console.log("\n***********************************************************\n");
    dboper.insertDocument(db, { name: "Shubham", descriptions: " hello shubham" }, 'dishes', (result) => {
        console.log("Insert document :\n ", result.ops);
        console.log("\n***********************************************************\n");


        dboper.findDocuments(db, 'dishes', (docs) => {
            console.log("Found Document :\n", docs);
            console.log("\n***********************************************************\n");


            dboper.updateDocument(db, { name: 'shubham' }, { descriptions: 'updated shubham khunt' }, 'dishes', (result) => {
                console.log("Updated documenet :\n ", result.result);
                console.log("\n***********************************************************\n");


                dboper.findDocuments(db, 'dishes', (docs) => {
                    console.log("Found Document :\n", docs);
                    console.log("\n***********************************************************\n");


                    db.dropCollection('dishes', (result) => {
                        console.log("Dropped Collection : ", result);

                        client.close();
                    });
                });
            });
        });
    });
});