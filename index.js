const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
const url = "mongodb+srv://ravitejagattu:GattuRavi@cluster0.zkqg1.mongodb.net/cluster0?retryWrites=true&w=majority";
MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('book-my-chair');
        console.log("Connected to Database");
        const userCollection = db.collection('users');

        app.post('/users', (req, res) => {
            userCollection.insertOne(req.body)
                .then(result => {
                    // res.redirect('/masterrole')
                    res.send(result);
                    console.log(result);
                })
                .catch(error => { console.log(error) })
        })

        app.post('/login', (req, res) => {
            console.log(req.body.username, req.body.password);



            var query = { name: req.body.username, password: req.body.password }
            userCollection.find(query).toArray(function (err, result) {
                if (err) throw err;
                if (result) res.send(result);
                console.log(result);
            });
            // userCollection.findOne({
            //     name: req.body.username,
            //     password: req.body.password
            // }, function (err, userCollection) {
            //     res.send(response);
            //     console.log(response);
            // })
            // const user = await userCollection.findOne({
            //     name: req.body.username,
            //     password: req.body.password
            // });
            // if (user) res.send(user);
            // else res.redirect('/');
        });

        // const db = client.db('UI5DB');
        // console.log("Connected to Database");
        // const masterRoleCollection = db.collection('masterrole');

        // //post method
        // app.post('/masterrolepost', (req, res) => {
        //     masterRoleCollection.insertOne(req.body)
        //         .then(result => {
        //             res.redirect('/masterrole')
        //         })
        //         .catch(error => { console.log(error) })
        // })
        // //get method
        // app.get('/masterrole', (req, res) => {
        //     db.collection('masterrole').find().toArray()
        //         .then(results => {
        //             // console.log(results);
        //             res.send(results);
        //         })
        //         .catch(error => console.error(error))
        // })

    })
    .catch(error => {
        console.log(error);
    });


app.listen(process.env.PORT || 8000);