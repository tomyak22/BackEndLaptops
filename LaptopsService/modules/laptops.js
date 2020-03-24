const fs = require('fs');

let read_json_file = () => {
    let file = './data/laptops.json';
    return fs.readFileSync(file);
}

exports.list = () => {
    return JSON.parse(read_json_file());
};

exports.calculate_price = (tax) => {
    let json_result = JSON.parse(read_json_file());
    for (let i = 0; i < json_result.length; i++) {
        var new_price = (json_result[i].price * (tax + 1)).toFixed(2);
        json_result[i].price = new_price;
    }
    return json_result;
}