app.get('/get/like', async (req, res) => {
    try {
      const movie= await Movie.findAll({
        where:{
            title:{[Sequelize.Op.like]:'%OO%'}
        }
      })
        res.json(movie)
    }

    catch (error) {
        res.json(error)
    }

})