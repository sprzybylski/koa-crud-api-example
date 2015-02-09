var monk = require('monk');
var wrap = require('co-monk');

var db;

module.exports.connect = function *(next) {
    db = monk(process.env.DB);
    this.products = wrap(db.get('products'));

    yield next;
};

module.exports.close = function *(next) {
    db.close();

    yield next;
};
