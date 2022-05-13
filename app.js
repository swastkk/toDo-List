const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
console.log(date.getDate());
console.log(date.getDay());
let ejs = require("ejs");
let items = [
  "Wake up Early in the Morning",
  "Buy Food",
  "Drink Plenty of water",
  "Code forSure",
];
let workItems = [];
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("list", { listTitle: day, newItems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newItems: workItems });
});
app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.listen(3000, function () {
  console.log("Server running at port 3000");
});
