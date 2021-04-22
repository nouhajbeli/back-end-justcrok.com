const { community } = require("../config/database");

module.exports = new (class userService {
    constructor() {
    }
  
    adduser(payload) {
      return  community.models.User.create(payload);
    }  
  })();