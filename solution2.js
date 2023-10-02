app.get('/get/rate', async (req, res) => {
    try {
      const movie= await Movie.findAll({
        where:{
            rating:{[Sequelize.Op.gt]:5}
        }
      })
        res.json(movie)
    }

    catch (error) {
        res.json(error)
    }

})