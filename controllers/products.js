module.exports.getProducts = function *(next) {
    var products = yield this.products.find({});

    if (!products) {
        this.throw(404);
    }

    this.body = products;

    yield next;
};

module.exports.getProductById = function *(id, next) {
    var product = yield this.products.findById(id);

    if (!product) {
        this.throw(404);
    }

    this.body = product;

    yield next;
};
