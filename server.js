const Hapi = require("@hapi/hapi");
const routes = require('./routes');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const { version } = require('./package.json');
const path = require('path'); // Importa path para resolver caminhos

const server = Hapi.server({
    port: 5000,
    host: "0.0.0.0"
});

const swaggerPlugin = [
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: {
            documentationPath: '/docs',
            schemes: ['http', 'https'],
            info: {
                title: 'API Aula laboratorio web',
                version: version
            }
        }
    }
];

const plugins = [
    {
        plugin: routes,
        options: {
            routesBaseDir: path.join(__dirname, 'api/v1') // Usa path para resolver o caminho base das rotas
        }
    }
];

plugins.push(...swaggerPlugin);

const init = async () => {
    await server.register(plugins);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

module.exports = { server, plugins };
