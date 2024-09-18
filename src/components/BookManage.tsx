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
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
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

  const deleteBook = (index: number) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks.map((book, i) => ({ ...book, sno: i + 1 })));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Omit<Book, 'sno'>) => {
    setNewBook({ ...newBook, [field]: e.target.value });
  };



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Management App</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        {books.map((book, index) => (
          <div key={book.sno} className="bg-white shadow rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">#{book.sno}</span>
              <div>
                <button onClick={() => editBook(index)} className="mr-2 text-blue-500">
                  ✏️
                </button>
                <button onClick={() => deleteBook(index)} className="text-red-500">
                  🗑️
                </button>
              </div>
            </div>
            <p><strong>Title:</strong> {book.booktitle}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Year:</strong> {book.yop}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
          </div>
        ))}
      </div>



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
          className="bg-blue-500 text-white p-2 rounded flex items-center"
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
                <td className="p-2">{book.sno}</td>
                <td className="p-2">{book.booktitle}</td>
                <td className="p-2">{book.author}</td>
                <td className="p-2">{book.genre}</td>
                <td className="p-2">{book.yop}</td>
                <td className="p-2">{book.isbn}</td>
                <td className="p-2">
                  <button onClick={() => editBook(index)} className="mr-2 text-blue-500">
                    ✏️
                  </button>
                  <button onClick={() => deleteBook(index)} className="text-red-500">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



    </div>
  );
};

export default BookManagementApp;
