const express = require('express')
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");



require("./db/db");

const Register = require("./model/schema");
const { error } = require('console');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/static', express.static('static'));     // For serving static files



app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, './views'));



const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).render('index.pug');
});

app.get('/home', (req, res) => {
    res.status(202).render('home.pug');
});


app.post('/', async (req, res) => {

    try {

        const Passward = req.body.passward;
        const ConfPassward = req.body.confpassward;
        if (Passward === ConfPassward) {

            const users = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                mobno: req.body.mobno,
                passward: Passward,
                confpassward: ConfPassward
            })
            const token = await users.generateAuthToken();

            // users.tokens = users.tokens.concat({ token: token });



            const registered = await users.save();
            res.status(201).render("login");

        } else {
            res.send("Passward & Confirm Passward are not same")
        }



    } catch (error) {
        res.status(400).send(error)
    }


});








app.get('/login', (req, res) => {
    res.status(201).render('login.pug');
});


app.post('/login', async (req, res) => {

    try {

        const email = req.body.email;
        const passward = req.body.passward;

        const useremail = await Register.findOne({ email: email });

        const isMatch = await bcrypt.compare(passward, useremail.passward);

        const token = await useremail.generateAuthToken();
        useremail.tokens = useremail.tokens.concat({ token: token });    
        // await useremail.save();

        if (isMatch) {
            res.status(201).render("home");
        } else {
            res.send("Invalid Login Details");

        }

    } catch {
        res.status(404).send("404 Invalid Login Details");

    }



});


















app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
})

