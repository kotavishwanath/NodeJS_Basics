const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./Public'))

app.use(morgan('short'))

app.get("/", (req, res) => {
  console.log("Responding to root route");
  res.send("Nodemon auto updates when I save this File, No need to run through 'node <filename>'")
})

// app.get("/users", (req,res) => {
//   const parent = {firstName: "Pushpa Latha", lastName: "Kota"}
//   const user1 = {firstName: "Vishwanath", lastName:"Kota"}
//   const user2 = {firstName: "Shoban", lastName:"Kota"}
//   const user3 = {firstName: "Laxmi", lastName:"Kota"}

//   res.json([user1,user2,user3,parent])
// })

app.post("/user_create", (req,res) => {
  console.log("Routing Works")
  console.log("First Name: " + req.body.create_first_name )

  const firstName = req.body.create_first_name
  const lastName = req.body.create_last_name

  const connection = getConnection()
  const queryStr = "INSERT INTO users (first_Name, last_name) VALUES (?, ?)"
  connection.query(queryStr, [firstName, lastName], (err, result, fields) => {
    if (err){
      console.log("Failed to Insert the User: "+ err)
      res.sendStatus(500)
      return
    }
    console.log("Successfully Inserted a new user with id: "+ result.insertId);
    res.end();
  })
})

function getConnection(){
  return mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'basics_mysql',
    port:'8889'
  })
}

app.get("/users/:id", (req,res)=> {

  console.log("Fetching User with Id: "+req.params.id);

  const connection = getConnection()

  const userId = req.params.id
  const queryString = "SELECT * FROM users WHERE id= ?"
  connection.query(queryString,[userId],(err, rows, fields) => {
    if (err){
      console.log("Failed to fetch query of Id: "+err);
      res.sendStatus(500) //500 is the HTTP status code
      res.end()
      return
    }
    console.log("I think we fetched users successfully");
    const users = rows.map((row) => {
      return {firstName: row.first_name, lastName: row.last_name}
    })
    res.json(users)
  })
})

app.get("/users", (req, res) => {
  const queryString = "SELECT * FROM users"
  getConnection().query(queryString, (err, rows, fields) =>{
    if(err){
      console.log("Failed to fetch details")
      res.sendStatus(500)
      return
    }
    res.json(rows)
  })
})

//Localhost 3004
app.listen(3004, () => {
  console.log("Server is up and listening 3004...");
})
