const Sequelize=require('sequelize')
const sequelize=require('../config')

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

module.exports= Movie;