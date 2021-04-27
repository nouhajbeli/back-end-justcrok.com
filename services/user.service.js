const { community } = require("../config/database");

module.exports = new (class userService {
    constructor() {
    }
  
    adduser(payload) {
      return  community.models.User.create(payload);
    }  
    updateimage({id},payload){
      console.log(payload)
      return community.models.User.update(payload,  {
        where: {
          id: id,
        },
      })
    }
  })();