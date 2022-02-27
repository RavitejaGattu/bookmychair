const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
const url = "mongodb+srv://ravitejagattu:GattuRavi@cluster0.zkqg1.mongodb.net/cluster0?retryWrites=true&w=majority";
MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('UI5DB');
        console.log("Connected to Database");
        const masterRoleCollection = db.collection('masterrole');
        // app.get('/', (req, res) => {
        //     res.send("Welcome to Book My Chair Application!!!");
        // })

        //post method
        app.post('/masterrolepost', (req, res) => {
            masterRoleCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/masterrole')
                })
                .catch(error => { console.log(error) })
        })
        //get method
        app.get('/masterrole', (req, res) => {
            db.collection('masterrole').find().toArray()
                .then(results => {
                    console.log(results);
                    res.send(results);
                })
                .catch(error => console.error(error))
        })

    })
    .catch(error => {
        console.log(error);
    });


app.listen(process.env.PORT || 8000);