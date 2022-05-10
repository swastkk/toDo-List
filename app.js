const express = require("express");
const bodyParser = require("body-parser");

let ejs = require("ejs");
var items = [
  "Wake up Early in the Morning",
  "Buy Food",
  "Drink Plenty of water",
  "Code forSure",
];
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  var today = new Date();
  var currentDay = today.getDay();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("en-US", options);
  res.render("list", { kindOfday: day, newItems: items });
});

app.post("/", function (req, res) {
  var item = req.body.newItem;
  //   console.log(item);
  items.push(item);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server running at port 3000");
});
