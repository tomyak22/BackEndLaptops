const fs = require('fs');

// Function to return the data of team.json by opening a read file stream
let read_json_file = () => {
    let file = './data/team.json';
    return fs.readFileSync(file);
}

// Return parsed JSON object of team.js
exports.list = () => {
    return JSON.parse(read_json_file());
};
