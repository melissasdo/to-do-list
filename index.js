import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import session from "express-session";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var message = "";
var weekday = "";
var month = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'to-to-list',
    resave: false,
    saveUninitialized: true
}));

function title(req, res) {

    const d = new Date();
    weekday = days[d.getDay()];
    month = months[d.getMonth()];

    message = weekday + ", " + month + " " + d.getDate() + " " + d.getFullYear();
};

app.get("/", (req, res) => {
    title();

    res.render(__dirname + '/views/index.ejs', {
        message : message,
        items : req.session.items
    });
});

app.get("/work", (req, res) => {
    res.render(__dirname + '/views/work.ejs', {
        itemsWork: req.session.itemsWork
    });
});

app.post("/", (req, res) => {
    title();

    if (!req.session.items) {
        req.session.items = [];
    }

    req.session.items.push(req.body.newEntry);

    res.render(__dirname + '/views/index.ejs', {
        message : message,
        items : req.session.items
    });
});

app.post("/work", (req, res) => {
    title();

    if (!req.session.itemsWork) {
        req.session.itemsWork = [];
    }

    req.session.itemsWork.push(req.body.newEntry);

    res.render(__dirname + '/views/work.ejs', {
        message: message,
        itemsWork: req.session.itemsWork
    });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];