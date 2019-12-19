// implement your API here
// server basic start code, moving to express server
// const http = require('http');



// const server = http.createServer((req, res) => {
//     console.log("ip:", req.connection.remoteAddress);
//     res.statusCode = 200;
//     res.setHeader("Content-Type", 'text/html');
//     res.write("<html><body><h1>NodeJS Server 1</h1></body></html>")
//     res.end();
// });

const hostname = "127.0.0.1";
const port = 8080;


const express = require("express");
let db = require("./database");
const app = express();
//parses request body to JSON
app.use(express.json());

app.get("/", (req, res) => {
    console.log("ip", req.ip)
    //res.send("<html><body><h1>NodeJS Server </h1></body></html>")
    //res.redirect("https://lambdaschool.com")
    res.json({ message: "Welcome to our API" })
})

app.get("/users", (req, res) => {
    res.json(db)
});

app.get("/users/:id", (req, res) => {
    const user = db.find(row => row.id === req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ error: "Not Found" });
    }
});

app.post("/users", (req, res) => {
    const newUser = {
        id: String(db.length +1),
        name: req.body.name,
    }
    db.push(newUser);
    res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
    const user = db.find(row => row.id === req.params.id)
    if (user) {
        db = db.filter(row => row.id !== req.params.id )
        res.json(user)
    } else {
        res.status(404).json({ error: "Not Found" });
    }
});

app.listen(port, hostname, () => {
    console.log(`server listening on http://${hostname}: ${port}`);
});