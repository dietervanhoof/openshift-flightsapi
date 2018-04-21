const util = require('util');
const minimist = require('minimist');

const required_arguments = [
    "PGHOST",
    "PGPORT",
    "PGUSER",
    "PGPASSWORD",
    "PGDATABASE"
];

const parseArguments = () => {
    const argv = minimist(process.argv.slice(2));
    let missingArguments = [];
    required_arguments.forEach((argument) => {
        if (!argv[argument]) {
            missingArguments.push(argument);
        }
    });
    if (missingArguments.length > 0) throw ('The following arguments are missing but are required: \n' + missingArguments.join(', '));
    return argv;
};

module.exports = {
    parseArguments: parseArguments
};