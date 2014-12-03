var koa = require('koa');
var route = require('koa-route');

var db = require('./lib/db');
var products = require('./controllers/products');

var app = koa();

app.use(function *(next) {
    this.remove('X-Powered-By');

    if (!this.accepts('json')) {
        this.throw(415);
    }

    yield next;
});

app.use(db.connect);

app.use(route.get('/products', products.getProducts));
app.use(route.get('/products/:id', products.getProductById));

app.use(db.close);

app.listen(process.env.port || 8080);
