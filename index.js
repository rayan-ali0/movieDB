const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3')
const Movie = require('./Models/movie')
const sequelize = require('./config')
const { Sequelize } = require('sequelize')

/********** USING ORM ************************* */
// Connecting Database
let db = new sqlite3.Database("movieDatabase.db", (err) => {
    if (err) {
        console.log("Error Occurred - " + err.message);
    }
    else {
        console.log("DataBase Connected..");
    }
})

sequelize.sync({ force: false })
    .then(() => {
        console.log("your tables synchronized successfully")
    })
    .catch((error) => {
        console.log("Error : " + error)
    })


app.get('/add', async (req, res) => {
    const { title, year, rating } = req.query;
    try {
       await Movie.create({ title, year, rating })
        res.json("movie added")
    }
    catch (error) {
        res.json(error)
    }
})

app.get('/get', async (req, res) => {
    try {
      const movies= await Movie.findAll()
        res.json(movies)
    }
    catch (error) {
        res.json(error)
    }
})

// // 1. find movie by Id



// // 2. find where rate>5
// // find where rate>=5



// // 3. find movie where title contains OO


/********************************************************/
/***********************WITHOUT ORM**********************/


// const dB=new sqlite3.Database('movieDatabase.db',(error)=>{
//     if(error){
//         console.log("Error"+error.message)
//     }
//     else{
//         console.log('database Connected')
//     }
// })

// dB.run(`
//   CREATE TABLE IF NOT EXISTS Movies (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT,
//     year INTEGER,
//     rating REAL
//   )
// `);


// app.get('/add',(req,res)=>{
//     const {title,year,rating,language}=req.query;
//     try{

//     dB.run(
//       `INSERT INTO Movies(title,year,rating,language) VALUES (?,?,?,?)`,[title,year,rating,language]
//     )
//     res.json("movie added")
//     }
//     catch(error){
//         res.json("movie not added")
//     }
// })

/********************************************************/

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(port, () => {
    console.log(`connected & listening on port ${port}`)
})

