const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const router = express.Router();

app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});

app.use('/todolist', router)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/dadjokes/db')
mongoose.Promise = global.Promise;


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
db.once('open', () => {
        console.log("CONNECTED TO DB AT /data/db/")
});

let jokeListSchema = new Schema ({
        name: String,
        joke: String
})

let jokeModel = mongoose.model('jokeModel', jokeListSchema);

app.listen(8080)

app.get('/jokelist', (req, res) => {
        jokeModel.find({})
        .then(jokeList => {
                res.json(jokeList)
        })
})

app.post('/jokelist', (req,res) =>{
        let newJoke = jokeModel ({
            name : req.body.name,
            joke : req.body.joke
        })
        newJoke.save()
        .then((jokeList) => {
                res.json({message: 'joke added'})
        })
        
})

