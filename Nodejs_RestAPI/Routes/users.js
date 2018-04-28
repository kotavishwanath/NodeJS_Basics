// This will contain all of the users related information
const express = require('express')
const mysql = require('mysql')

const router = express.Router()
router.get('/messages', (req, res) => {
    console.log("Show someo of the mesages or anything else from Routes folder of user.js file")
    res.end()
})

router.get("/users", (req, res) => {
    const queryString = "SELECT * FROM users"
    getConnection().query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to fetch details")
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'basics_mysql',
    port: '8889'
})

function getConnection() {
    return pool
}

router.post("/user_create", (req, res) => {
    console.log("Routing Works")
    console.log("First Name: " + req.body.create_first_name)

    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name

    const connection = getConnection()
    const queryStr = "INSERT INTO users (first_Name, last_name) VALUES (?, ?)"
    connection.query(queryStr, [firstName, lastName], (err, result, fields) => {
        if (err) {
            console.log("Failed to Insert the User: " + err)
            res.sendStatus(500)
            return
        }
        console.log("Successfully Inserted a new user with id: " + result.insertId);
        res.end();
    })
})

router.get("/users/:id", (req, res) => {

    console.log("Fetching User with Id: " + req.params.id);

    const connection = getConnection()

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id= ?"
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to fetch query of Id: " + err);
            res.sendStatus(500) //500 is the HTTP status code
            res.end()
            return
        }
        console.log("I think we fetched users successfully");
        const users = rows.map((row) => {
            return { firstName: row.first_name, lastName: row.last_name }
        })
        res.json(users)
    })
})

module.exports = router