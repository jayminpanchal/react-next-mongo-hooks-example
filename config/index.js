const appName = 'nextjs-react-mongodb-demo';
const serverPort = 5000;

const completeConfig = {
    default: {
        appName,
        serverPort,
        databaseUrl: '<MLAB_CONN_STRING>',
        jsonOptions: {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    },
    development: {
        appUrl: `http://localhost:${serverPort}/`
    },
    production: {
        appUrl: ``
    }
};

// Public API
module.exports = {
    config: {...completeConfig.default, ...completeConfig[process.env.NODE_ENV]},
    completeConfig
};
