const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
const ip = process.env.IP;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view-engine", "hbs");
// Log date time and url to server.log file
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log",log + "\n", (err) => {
           if(err) {
               console.log(err);
           } 
        });
    next();
});

// Enable maintance mode
// app.use((req, res, next) => {
//   res.render("maintance.hbs"); 
// });
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.get("/",(req, res) => {
    res.render("home.hbs", {
       pageTitle: "Home Page",
       welcomeMessage: "Welcome to my site!"
   });
});

app.get("/about", (req, res) => {
   res.render("about.hbs", {
       pageTitle: "About Page",
   });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Unable to handle request"
    });   
});

app.listen(port, ip, () => {
    console.log(`The Express Server Has Started! Running on port: ${port}`);
});