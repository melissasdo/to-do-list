import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var message = "";
var weekday = "";
var month = "";
let items = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function title(req, res) {

    const d = new Date();
    weekday = days[d.getDay()];
    month = months[d.getMonth()];

    message = weekday + ", " + month + " " + d.getDate() + " " + d.getFullYear();
};

app.get("/", (req, res) => {
    title();

    res.render(__dirname + '/views/index.ejs', {
        message : message
    });
});

app.get("/work", (req, res) => {
    res.render(__dirname + '/views/work.ejs');
});

app.post("/", (req, res) => {
    title();

    items.push(req.body.newEntry)

    res.render(__dirname + '/views/index.ejs', {
        message : message,
        items : items
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