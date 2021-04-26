const RateService = require("../services/rate.service.js");
const { community } = require("../config/database");
const { validationResult } = require("express-validator");


module.exports = {
  async getratesById(req, res, next) {

    try {
        const { Id_recette } = req.params;
      const rates= await RateService.getrates(req.params);
      res.send(rates);
    } catch (error) {
    next(error)      
    }
  },

 

  async addRate(req, res, next) {
       
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const error = new Error("Validation failed");
          error.statusCode = 422;
          error.data = errors.array();
          throw error;
        }
        const { rates, UserId,Id_recette} = req.body;
        console.log(req.body)
    const rate = await RateService.addRate(req.body);
      res.send(rate);
    } catch (error) {
      next(error)
    }
  },


  async updateRate(req, res, next) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const error = new Error("Validation failed");
          error.statusCode = 422;
          error.data = errors.array();
          throw error;
        }
        const { rates, id, Id_recette, UserId } = req.body;
      const rate = await RateService.updateRate(req.body);
      res.json(rate);
    } catch (error) {
      next(error)     
      }
  },
  async getAllRates(req,res,next){
    try {
      const rates = await community.models.Rate.findAll();
      if (rates.length === 0) {
        const error = new Error("rates not found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(rates);
    } catch (error) {
      
      next(error);
    }
  }

};