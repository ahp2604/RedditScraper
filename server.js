
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const exphbs = require("express-handlebars");
const request = require("request");

const models = require("./models");
const app = express();
const PORT = 3000;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraper";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


//connect to mongodb 
mongoose.connect('mongodb://localhost/newsScraper');
const db = mongoose.connection;

db.on("error", function (req, res) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function (req, res) {

    console.log("Mongoose DB connected")
});



//render homepage
app.get("/", function (req, res) {

    res.render('index')
});


app.get("/scrape", function (req, res) {

    request("https://www.reddit.com/r/webdev", function (err, req, html) {

        let $ = cheerio.load(html);


        $("p.title").each(function (i, element) {

            let result = {};

            result.headline = $(element).text();

            result.link = $(element).children().attr("href");



            models.news.create(result)
                .then(function (dbNews) {
                    console.log(dbNews);
                })
                .catch(function (err) {
                    return res.json(err);
                });



        });

        res.send("Scraped");

    })

})


app.get("/news", function (req, res) {
    models.news.find({})
        .then(function (dbNews) {

            res.json(dbNews);
        })
        .catch(function (err) {
            res.json(err);
        });
});


app.get("/news/:id", function (req, res) {
    models.news.findOne({ _id: req.params.id })
        .populate("notes")
        .then(function (dbUsers) {
            res.json(dbUsers);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post("/news/:id", function (req, res) {
    models.notes.create(req.body)
        .then(function (dbUsers) {

            return models.news.findOneAndUpdate({ _id: req.params.id }, { notes: dbUsers._id }, { new: true });
        })
        .then(function (dbNews) {

            res.json(dbNews);
        })
        .catch(function (err) {
            res.json(err);
        });
});





// Listen on port 3000
app.listen(PORT, function () {
    console.log("App running on port 3000!");
});