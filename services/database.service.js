const { Pool } = require('pg');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const SQL_LOCATION = './scripts/postgresql';
/**
 * Database constants
 **/
// Flights
const CREATE_FLIGHTS_TABLE_SCRIPT = 'CreateFlightsTable.sql';
const FLIGHTS_TABLE = 'flights';

class DatabaseService {
    constructor(args) {
        this.pool = new Pool({
            host: args.PGHOST,
            port: args.PGPORT,
            user: args.PGUSER,
            password: args.PGPASSWORD,
            database: args.PGDATABASE
        });
    }
    initializeDatabase = async () => {
        await this.processSqlFile(CREATE_FLIGHTS_TABLE_SCRIPT);
    };

    getFlights = async () => {
        const text = 'SELECT * FROM ' + FLIGHTS_TABLE + ';';
        return (await this.executeParameterizedQuery(
            text,
            [ ]
        )).rows || undefined;
    };

    getFlight = async (id) => {
        const text = 'SELECT * FROM ' + FLIGHTS_TABLE + ' WHERE flight_id = $1;';
        return (await this.executeParameterizedQuery(
            text,
            [ id ]
        )).rows[0] || undefined;
    };

    createNewFlight = async (data) => {
        await this.executeParameterizedQuery(
            'INSERT INTO ' + FLIGHTS_TABLE + '(origin, destination, scheduleddeparturedate) VALUES($1, $2, $3)',
            [ data.origin, data.destination, data.scheduleddeparturedate ]
        );
        return;
    };

    processSqlFile = async (fileName) => {
        const query = fs.readFileSync(path.join(__dirname, '..', SQL_LOCATION, fileName)).toString();
        await this.executeQuery(query);
    };

    executeParameterizedQuery = async (query, data) => {
        return await this.pool.query(query, data);
    };

    executeQuery = async (query) => {
        return await this.pool.query(query);
    };
}

module.exports = DatabaseService;