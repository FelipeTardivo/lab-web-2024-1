let authors = [
  { id: '1', name: 'J.R.R. Tolkien' },
  { id: '2', name: 'George R.R. Martin' }
];

// Lista autores
exports.getAuthors = (req, h) => {
  return h.response(authors).code(200);
};

// Adiciona autor
exports.addAuthor = (req, h) => {
  const newAuthor = {
    id: String(authors.length + 1),
    name: req.payload.name
  };
  authors.push(newAuthor);
  return h.response(newAuthor).code(201);
};

// detale autor especifico
exports.getAuthorById = (req, h) => {
  const authorId = req.params.id;
  const author = authors.find(author => author.id === authorId);

  if (!author) {
    return h.response({ message: 'Autor não encontrado' }).code(404);
  }

  return h.response(author).code(200);
};

// Deleta um autor específico
exports.deleteAuthor = (req, h) => {
  const authorId = req.params.id;
  
  // Verifica se o autor está relacionado a livro
  const relatedBooks = books.filter(book => book.authorId === authorId);
  
  if (relatedBooks.length > 0) {
    return h.response({ message: 'Não é possível deletar um autor relacionado a um ou mais livros' }).code(400);
  }
  
  // Verifica se o autor existe
  const authorIndex = authors.findIndex(author => author.id === authorId);
  
  if (authorIndex === -1) {
    return h.response({ message: 'Autor não encontrado' }).code(404);
  }
  
  // Deleta o autor
  authors.splice(authorIndex, 1);
  return h.response().code(204);
};
