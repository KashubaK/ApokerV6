// properties / settings for PoinZ backend

const settings = {

  // host + port for webserver + socketserver
  serverHost: '0.0.0.0',
  serverPort: process.env.PORT || 8080,

  // configuration for winston logging
  log: {
    file: {
      level: 'info',
      name: 'apoker.log'
    },
    console: {
      level: 'info'
    }
  },

  // if set to false, in-memory store is used. if true, rooms are persisted in redis
  persistentStore: true,

  // configuration for redis connection (roomsStore)
  // env variables are set by docker when linking redis container to Apoker container
  // see DEPLOYMENT.md for more information
  redis: {
    host: process.env.DB_PORT_6379_TCP_ADDR || '127.0.0.1',
    port: process.env.DB_PORT_6379_TCP_PORT || 6379
  }
};

module.exports = settings;
