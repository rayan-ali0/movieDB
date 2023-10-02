const Sequelize=require('sequelize')

const sequelize= new Sequelize({
    dialect : 'sqlite',
    storage :'movieDatabase.db'
})

module.exports=sequelize;