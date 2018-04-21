const DatabaseService = require('./services/database.service');
const Api = require('./api/index');
const cmdargs = require('./utils/cmdargs');

/** Parse command-line arguments **/
const args = cmdargs.parseArguments();

const databaseService = new DatabaseService(args);
const api = new Api();
api.startListening();

intialize();

async function intialize() {
    await databaseService.initializeDatabase();
}