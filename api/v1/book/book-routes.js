const bookController = require('./book-controller');

module.exports = {
    name: 'book-routes',
    version: '1',
    register: async (server, options) => {
        server.route([
            {
                method: 'GET',
                path: '/books',
                handler: bookController.getBooks
            },
            {
                method: 'POST',
                path: '/books',
                handler: bookController.addBook
            },
            {
                method: 'GET',
                path: '/books/{id}',
                handler: bookController.getBookById
            }
        ]);
    }
};
