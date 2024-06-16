const authorController = require('./author-controller');

module.exports = {
    name: 'author-routes',
    version: '1',
    register: async (server, options) => {
        server.route([
            {
                method: 'GET',
                path: '/authors',
                handler: authorController.getAuthors
            },
            {
                method: 'POST',
                path: '/authors',
                handler: authorController.addAuthor
            },
            {
                method: 'GET',
                path: '/authors/{id}',
                handler: authorController.getAuthorById
            },
            {
                method: 'DELETE',
                path: '/authors/{id}',
                handler: authorController.deleteAuthor
            }
        ]);
    }
};

