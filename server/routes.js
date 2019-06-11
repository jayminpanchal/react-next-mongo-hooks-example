const routes = require('next-routes');
const routesImplementation = routes();

routesImplementation.add('/', 'index');

module.exports = routesImplementation;