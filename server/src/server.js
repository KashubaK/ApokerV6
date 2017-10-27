const path = require('path');
const express = require('express');
const settings = require('./settings');
const socketServer = require('./socketServer');
const commandProcessorFactory = require('./commandProcessor');
const logging = require('./logging');
const rest = require('./rest');
const roomsStoreFactory = require('./store/roomStoreFactory');
const commandHandlers = require('./commandHandlers/commandHandlers');
const eventHandlers = require('./eventHandlers/eventHandlers');

const LOGGER = logging.getLogger('server');

const app = express();

const store = roomsStoreFactory(settings.persistentStore);

// setup REST api
rest.init(app, store);

// serve static client files
console.log("Statis Files path", __dirname);
app.use(express.static(path.resolve(__dirname, '../src/public')));
// enable html5 history mode by "forwarding" every unmatched route to the index.html file
app.get('*', function (request, response) {
	console.log("We hit the route again", __dirname)
  response.sendFile(path.resolve(__dirname, '../src/public/index.html'));
});

const commandProcessor = commandProcessorFactory(
  commandHandlers,
  eventHandlers,
  store
);

const server = socketServer.init(app, commandProcessor);
server.listen(settings.serverPort, settings.serverHost, () => LOGGER.info(`-- SERVER STARTED -- (${ settings.serverHost }:${settings.serverPort})`));

process.on('SIGINT', () => server.close(()=> process.exit(0)));
