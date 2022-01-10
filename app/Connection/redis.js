const redis = require("redis");
const { logger } = require("../../logger/logger");

let client;
class RedisServer {
  constructor () {
    this.connect();
  }

  connect = () => {
    client = redis.createClient();
    client.connect();
    client.on("connect", function () {
      console.log("Connected to Redis");
    });
  };

  getData = async (key) => {
    let data = await client.get(key + "getById")
    try {
      if (!data) {
        return null;
      }
      return JSON.parse(data);
    }catch(error) {
      throw error;
    }
  }

  setData = async (key, time, data) => {
    client.setEx(key, time, data);
  };

  ClearCache = async(key) => {
     let deletecache = await client.del(key)
     try{
       if(!deletecache){
          return null;
       }
       return true;
     }catch(error){
      logger.error("Some Error occured while in clearing cache");
     }
  };
}

module.exports = new RedisServer();