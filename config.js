// configuration file to specify your database connection details
const Sequelize=require('sequelize')

const sequelize= new Sequelize({
    dialect : 'sqlite',
    storage :'movieDatabase.db'
})

module.exports=sequelize;