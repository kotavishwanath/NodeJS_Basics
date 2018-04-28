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

const router = require('./Routes/users')

router.get('/messages2', (req, res) => {
  console.log("Messages 2 response ")
  res.end()
})

app.use(router)


//Localhost 3004
app.listen(3004, () => {
  console.log("Server is up and listening 3004...");
})
