app.get('/get/id/:Id', async (req, res) => {
    const Id=req.params.Id;
    try {
      const movie= await Movie.findByPk(Id)
        res.json(movie)
    }

    catch (error) {
        res.json(error)
    }
})