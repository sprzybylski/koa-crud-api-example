var koa = require('koa');
var route = require('koa-route');
var auth = require('koa-basic-auth');

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

app.use(route.get('/products', products.get));
app.use(route.get('/products/:id', products.getById));

app.use(route.post('/products',  auth({name: process.env.name, pass: process.env.pass})));
app.use(route.post('/products', products.create));

app.use(db.close);

app.listen(3000);
