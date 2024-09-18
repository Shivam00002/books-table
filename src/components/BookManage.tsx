import React, { useState } from 'react';

interface Book {
  sno: number;
  booktitle: string;
  author: string;
  genre: string;
  yop: string;
  isbn: string;
}

const BookManagementApp: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [newBook, setNewBook] = useState<Omit<Book, 'sno'>>({
    booktitle: '',
    author: '',
    genre: '',
    yop: '',
    isbn: '',
  });

  const addBook = () => {
    if (editingIndex === -1) {
      setBooks([...books, { ...newBook, sno: books.length + 1 }]);
    } else {
      const updatedBooks = [...books];
      updatedBooks[editingIndex] = { ...newBook, sno: editingIndex + 1 };
      setBooks(updatedBooks);
      setEditingIndex(-1);
    }
    setNewBook({ booktitle: '', author: '', genre: '', yop: '', isbn: '' });
  };

  const editBook = (index: number) => {
    setEditingIndex(index);
    setNewBook(books[index]);
  };

  const updateBook = (index: number) => {
    const updatedBooks = [...books];
    updatedBooks[index] = { ...newBook, sno: index + 1 };
    setBooks(updatedBooks);
    setEditingIndex(-1);
  };

  const deleteBook = (index: number) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks.map((book, i) => ({ ...book, sno: i + 1 })));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Omit<Book, 'sno'>) => {
    setNewBook({ ...newBook, [field]: e.target.value });
  };

  // Check if any field is empty to disable Add/Update button
  const isAddDisabled = Object.values(newBook).some((value) => typeof value === 'string' && value.trim() === '');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Management App</h1>

      {/* New book form */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-bold mb-2">{editingIndex === -1 ? 'Add New Book' : 'Edit Book'}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-4">
          <input
            type="text"
            placeholder="Book Title"
            value={newBook.booktitle}
            onChange={(e) => handleInputChange(e, 'booktitle')}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => handleInputChange(e, 'author')}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Genre"
            value={newBook.genre}
            onChange={(e) => handleInputChange(e, 'genre')}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Year of Publishing"
            value={newBook.yop}
            onChange={(e) => handleInputChange(e, 'yop')}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="ISBN"
            value={newBook.isbn}
            onChange={(e) => handleInputChange(e, 'isbn')}
            className="border p-2 rounded w-full"
          />
        </div>
        <button 
          onClick={addBook} 
          disabled={isAddDisabled}
          className={`p-2 rounded flex items-center ${isAddDisabled ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
        >
          {editingIndex === -1 ? '➕ Add Book' : '✔️ Update Book'}
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">S.No</th>
              <th className="p-2">Book Title</th>
              <th className="p-2">Author</th>
              <th className="p-2">Genre</th>
              <th className="p-2">Year of Publishing</th>
              <th className="p-2">ISBN</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.sno} className="border-b">
                {editingIndex === index ? (
                  // Editable row
                  <>
                    <td className="p-2">{book.sno}</td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={newBook.booktitle}
                        onChange={(e) => handleInputChange(e, 'booktitle')}
                        className="border p-2 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={newBook.author}
                        onChange={(e) => handleInputChange(e, 'author')}
                        className="border p-2 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={newBook.genre}
                        onChange={(e) => handleInputChange(e, 'genre')}
                        className="border p-2 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={newBook.yop}
                        onChange={(e) => handleInputChange(e, 'yop')}
                        className="border p-2 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={newBook.isbn}
                        onChange={(e) => handleInputChange(e, 'isbn')}
                        className="border p-2 rounded w-full"
                      />
                    </td>
                    <td className="p-2">
                      <button onClick={() => updateBook(index)} className="mr-2 text-green-500">
                        ✔️ Save
                      </button>
                      <button onClick={() => setEditingIndex(-1)} className="text-red-500">
                        ✖️ Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  // View-only row
                  <>
                    <td className="p-2">{book.sno}</td>
                    <td className="p-2">{book.booktitle}</td>
                    <td className="p-2">{book.author}</td>
                    <td className="p-2">{book.genre}</td>
                    <td className="p-2">{book.yop}</td>
                    <td className="p-2">{book.isbn}</td>
                    <td className="p-2">
                      <button onClick={() => editBook(index)} className="mr-2 text-blue-500">
                        ✏️ Edit
                      </button>
                      <button onClick={() => deleteBook(index)} className="text-red-500">
                        🗑️ Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagementApp;
