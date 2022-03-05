const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs');
// const User = require('./model/user');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
const url = "mongodb+srv://ravitejagattu:GattuRavi@cluster0.zkqg1.mongodb.net/cluster0?retryWrites=true&w=majority";
MongoClient.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(client => {
        const db = client.db('book-my-chair');
        console.log("Connected to Database");
        const userCollection = db.collection('users');
        const BookingCollection = db.collection('bookings');

        app.post('/users', (req, res) => {

            userCollection.insertOne(req.body)
                .then(result => {
                    // res.redirect('/masterrole')
                    res.send(result);
                    console.log(result);
                    res.json({ status: 'ok' })
                })
                .catch(error => {
                    console.log(error)
                    res.json({ status: 'error' })
                })
        })

        app.post('/login', (req, res) => {
            console.log(req.body.username, req.body.password);

            var query = { name: req.body.username, password: req.body.password }
            userCollection.find(query).toArray(function (err, result) {
                if (err) throw err;
                if (result) res.send(result);
                console.log(result);
            });
        })

        app.post('/book', (req, res) => {

            BookingCollection.insertOne(req.body)
                .then(result => {
                    res.send(result);
                    console.log(result);
                })
                .catch(error => {
                    console.log(error)
                })
        })

        app.post('/bookings', (req, res) => {
            var query = { user: req.body.user }
            console.log(query)
            BookingCollection.find(query).toArray(function (err, result) {
                if (err) throw err;
                if (result) res.send(result);
                console.log(result);
            })
        })

    })
    .catch(error => {
        console.log(error);
    });


app.listen(process.env.PORT || 8000);



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




        //Schema Based
        // console.log(req.body);

            // const { name, password: plainTextPassword } = req.body;
            // const password = await bcrypt.hash(plainTextPassword, 10);
            // console.log(name)
            // console.log(password)


            // try {
            //     const response = await User.create({
            //         name,
            //         password
            //     })
            //     console.log('User created response:', response)
            //     res.json({ status: 'ok' })
            // } catch (error) {
            //     console.log(error)
            //     res.json({ status: 'error' })
            // }
            // console.log(await bcrypt.hash(password, 10));



            //Findone query

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