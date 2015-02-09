var parse = require('co-body');

module.exports.get = function *(next) {
    this.body = yield this.products.find({});

    yield next;
};

module.exports.getById = function *(id, next) {
    var product = yield this.products.findById(id);

    if (!product) {
        this.throw(404);
    }

    this.body = product;

    yield next;
};

module.exports.create = function *(next) {
    var product = yield parse(this);

    this.status = 201;
    this.body = yield this.products.insert(product);

    yield next;
};
