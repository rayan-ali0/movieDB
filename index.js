const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3')
const Movie = require('./Models/movie')
const sequelize = require('./config')
const Sequelize = require('sequelize')

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
// synchronize defined models with database
// it creates or updates db tables based on the model definitions
sequelize.sync({ force: false })
    .then(() => {
        console.log("your tables synchronized successfully")
    })
    .catch((error) => {
        console.log("Error : " + error)
    })


app.get('/add', async (req, res) => {
    const { title, year, rating ,language} = req.query;
    try {
        await Movie.create({ title, year, rating , language})
        res.json("movie added")
    }
    catch (error) {
        res.json(error)
    }
})

app.get('/get', async (req, res) => {
    try {
        const movies = await Movie.findAll({
            attributes :['title','year']
        })
        res.json(movies)
    }
    catch (error) {
        res.json(error)
    }
})


// // 1. find movie by Id
app.get('/get/id/:Id', async (req, res) => {
    const Id = req.params.Id;
    try {
        /******Put your answer here *********/
        const movie=await Movie.findByPk(Id)
        // res.json(movie)
        const movieDetails=movie.printDetails();
       res.send(movieDetails);
    }

    catch (error) {
        res.json(error)
    }
})


// // 2. find where rate>5
// // find where rate>=5

app.get('/get/rate', async (req, res) => {
    try {
        /******Put your answer here *********/
       const movie= await Movie.findAll({
        where : {
            rating : { [Sequelize.Op.gte ]: 5},
        }
       })
        res.json(movie)
    }

    catch (error) {
        res.json(error)
    }

})

// // 3. find movie where title contains OO

app.get('/get/like', async (req, res) => {
    try {
        /******Put your answer here *********/
const movie=await Movie.findAll({
    where :{
        title: { [Sequelize.Op.like]: '%oo%'}
    }
})
        res.json(movie)
    }

    catch (error) {
        res.json(error)
    }

})
/********************************************************/
/***********************WITHOUT ORM**********************/

// db.run(`
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

//     db.run(
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
    res.send("WELCOME IN ORM WORLD")
})

app.listen(port, () => {
    console.log(`connected & listening on port ${port}`)
})

