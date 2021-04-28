const avisService = require("../services/avis.service.js");
const { community } = require("../config/database");
const { validationResult } = require("express-validator");


module.exports = {
  async getAvis(req, res, next) {

    try {
      const avis= await avisService.getAvis();
      res.send(avis);
    } catch (error) {
      // handle error
    next(error)      
    }
  },

 

  async addAvis(req, res, next) {
      
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const error = new Error("Validation failed");
          error.statusCode = 422;
          error.data = errors.array();
          throw error;
        }
        const { avis, UserId,Id_recette} = req.body;
    const avi = await avisService.addAvis(req.body);
      res.send(avi);
    } catch (error) {
      // handle error
      next(error)
    }
  },
  async deleteAvis(req, res, next) {
    try {
      const avis = await avisService.deletAvis(req.params);
      res.json(avis);
    } catch (error) {
      // handle error
        next(error)   
 }
  },

 
  async updateAvis(req, res, next) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const error = new Error("Validation failed");
          error.statusCode = 422;
          error.data = errors.array();
          throw error;
        }
        const { avis, id,  UserId } = req.body;
      const avi = await avisService.updateAvis(req.body);
      res.json(avi);
    } catch (error) {
      // handle error
      next(error)     
      }
  }
};