const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3')
const Movie = require('./Models/movie')
const sequelize = require('./config')

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

app.get('/add', (req, res) => {
    const { title, year, rating } = req.query;
    try {
        Movie.create({ title, year, rating })
        res.json("movie added")
    }
    catch (error) {
        res.json(error)
    }

})
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
//     const {title,year,rating}=req.query;
//     try{

//     dB.run(
//       `INSERT INTO Movies(title,year,rating) VALUES (?,?,?)`,[title,year,rating]
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

