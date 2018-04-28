
//Load our App serever using express somehow...
//https://www.youtube.com/watch?v=F7NVpxxmmgM

//Install Morgan to console log whats

//https://www.youtube.com/watch?v=mLLUqMpf5H0
//https://www.youtube.com/watch?v=LKZYoeRfmh4

//https://www.youtube.com/watch?v=fW1l8cyqfEs

const express = require('express')
const app = express()

const morgan = require('morgan')

const mysql = require('mysql')


app.use(morgan('combined'))
//For 'combined' logger level we get the below output
// ::1 - - [19/Apr/2018:03:15:46 +0000] "GET /users HTTP/1.1" 200 127 "-" "Mozilla/5.
// 0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Ver
// sion/11.1 Safari/605.1.15"
// ::1 - - [19/Apr/2018:03:16:10 +0000] "GET /users HTTP/1.1" 200 127 "-" "Mozilla/5.
// 0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrom
// e/65.0.3325.181 Safari/537.36"
// ::1 - - [19/Apr/2018:03:16:11 +0000] "GET /favicon.ico HTTP/1.1" 404 150 "http://l
// ocalhost:3004/users" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/
// 537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
// ::1 - - [19/Apr/2018:03:16:41 +0000] "GET /users HTTP/1.1" 304 - "-" "Mozilla/5.0
// (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/
// 65.0.3325.181 Safari/537.36"

// app.use(morgan('short'))
//For 'short' logger level we get the below output
// ::1 - GET /users HTTP/1.1 200 127 - 2.825 ms
// ::1 - GET /users HTTP/1.1 200 127 - 0.395 ms
// ::1 - GET /users HTTP/1.1 200 127 - 0.272 ms
// ::1 - GET /users HTTP/1.1 200 127 - 0.162 ms
// ::1 - GET /users HTTP/1.1 200 127 - 0.148 ms


app.get("/", (req, res) => {
  console.log("Responding to root route");
  // res.send("Heloo form ROOOTTTT Local system of Vishwanath");
  res.send("Nodemon auto updates when I save this File, No need to run through 'node <filename>'")
})

app.get("/users", (req,res) => {
  const parent = {firstName: "Pushpa Latha", lastName: "Kota"}
  const user1 = {firstName: "Vishwanath", lastName:"Kota"}
  const user2 = {firstName: "Shoban", lastName:"Kota"}
  const user3 = {firstName: "Laxmi", lastName:"Kota"}

  res.json([user1,user2,user3,parent])
})

app.get("/users/:id", (req,res)=> {

  console.log("Fetching User with Id: "+req.params.id);

  const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'basics_mysql',
    port:'8889'
  })
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

    // console.log(fields)

    const users = rows.map((row) => {
      return {firstName: row.first_name, lastName: row.last_name}
    })

    res.json(users)
    //res.json(rows)
  })
  // res.end();

})

//Localhost 3004
app.listen(3004, () => {
  console.log("Server is up and listening 3004...");
})
