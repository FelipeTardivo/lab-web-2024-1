let books = [
    { id: '1', title: 'O Senhor dos Anéis', authorId: '1' },
    { id: '2', title: 'Planolândia - Um Romance De Muitas Dimensões', authorId: '2' }
  ];
  
  // Lista todos os livros
  exports.getBooks = (req, h) => {
    return h.response(books).code(200);
  };
  
  // Adiciona  novo livro
  exports.addBook = (req, h) => {
    const newBook = {
      id: String(books.length + 1),
      title: req.payload.title,
      authorId: req.payload.authorId
    };
    books.push(newBook);
    return h.response(newBook).code(201);
  };
  
  // Obtém os detalhes do livro especifico
  exports.getBookById = (req, h) => {
    const bookId = req.params.id;
    const book = books.find(book => book.id === bookId);
  
    if (!book) {
      return h.response({ message: 'Livro não encontrado' }).code(404);
    }
  
    return h.response(book).code(200);
  };
  