const Sequelize=require('sequelize')
const sequelize=require('../config')

//we define the models using define method . 
//These method are created as objects that can interact with your db tables
const Movie= sequelize.define('Movie',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull :false
    },
    year:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    rating:{
        type:Sequelize.FLOAT,
        defaultValue:4
    },
    language:{
        type:Sequelize.STRING,
        defaultValue:"English"
    }
},{
    timestamps:false

})



Movie.prototype.printDetails=function(){
    return `Movie title : ${this.title}<br>Year: ${this.year}`
}

module.exports= Movie;


/**
 * 
 * WE use prototype to make it an instance Method
 */


// This is a Static Method , It will be for thw whole Class
// Movie.printDetails = async function(){
//        return `Movie title : ${this.title}<br>Year: ${this.year}`

// }
