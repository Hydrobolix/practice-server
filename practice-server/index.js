const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const port = 3000;
const item = require("./data.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use(express.static(`public`));

app.get("/", function(req, res) {
    res.sendFile("index.html");
});

app.listen(port, () => console.log(`Listening on port ${port}`));


const mysql = require("mysql");
 connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pr32j532j2995rwnmv019adjf",
    database: "sample_db",
});

connection.connect(function(err) {
    if (err) {
        console.log("error connecting " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

/*
const insertion = {
    name: "Tommy",
    age: 21,
    career: "Pharmacist",
};


connection.query("insert into sample_db.sample_table set ?", insertion, (err, sample_table, fields) => {
    if (err) throw err;

    console.log("Added successfully");
});*/

/*
connection.query("insert into sample_db.sample_table set ?", {name: "Carl", age: 23, career: "Nurse"}, (err, sample_table, fields) => {
    if (err) throw err;

    console.log("Added successfully");
});*/

let db_list_id = [];
let db_list_name = [];
let db_list_age = [];
let db_list_career = [];

function add_to_db_list(list) {
    db_list_id.push(list.id);
    db_list_name.push(list.name);
    db_list_age.push(list.age);
    db_list_career.push(list.career);
}

connection.query("select * from sample_db.sample_table", (err, rows, fields) => {
    if (err) throw err;

    //console.log("here we go: ", JSON.stringify(rows));
    
    for (let i = 0; i < rows.length; i++) {
        console.log("Row ", i, ": ", JSON.stringify(rows[i]));
        add_to_db_list((rows[i]));
    }
});

app.post("/collected", function(req, res) {
    console.log(req.body);
    console.log("Got it");

    connection.query("insert into sample_db.sample_table set ?", req.body, (err, sample_table, fields) => {
        if (err) throw err;
        console.log("Added successfully");
        //add_to_db_list(JSON.stringify(sample_table));
    });
    
    res.redirect("/databaseInfo");
});

app.get("/databaseInfo", function(req, res) {
    res.write("<h1>Info in DB: </h1>");
    res.write("<table><tr>");
    res.write("<th>Id</th><th>Name</th><th>Age</th><th>Career</th></tr>");
    for (let i = 0; i < db_list_id.length; i++) {
        res.write("<tr><td>" + db_list_id[i] + "</td><td>" + db_list_name[i] + "</td><td>" + db_list_age[i] + "</td><td>" + db_list_career[i] + "</td></tr>");
    }
    res.write("</table>");
});



