const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const url = 'mongodb://localhost:27017';
const dbName = 'users';

const client = new MongoClient(url);

client.connect();

const db = client.db(dbName);
const collection = db.collection('users');
module.exports = {collection, express};

const PORT = 3000;
const app = express();

const signUpPage = require("./route/singup.js");
const signInPage = require("./route/signin.js");
const catalogPage = require("./route/catalog.js");
const contactsPage = require("./route/contacts.js");

app.listen(PORT, ()=>{
    console.log(`Сервер запущен на порту: ${PORT}`);
});

app.use('/', express.static(path.join(__dirname, "..", "frontend", "main")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "main", "index.html"));
});

//routing
app.use('/signup', signUpPage);
app.use("/signin", signInPage);
//app.use("/catalog", catalogPage);
//app.use("/contacts", contactsPage);