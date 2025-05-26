import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getBooksAdmin } from '../services/bookService';
import type { PageResponse } from '../services/bookService';

import type { BookAdminDto } from '../types';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<BookAdminDto[]>([]);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {
    if (loading || isLast) return;

    setLoading(true);
    try {
      const res: PageResponse<BookAdminDto> = await getBooksAdmin(page);
      setBooks((prev) => [...prev, ...res.content]);
      setIsLast(res.last);
      setPage(res.number + 1);
    } catch (error) {
      console.error('Failed to load books', error);
      alert('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Books</h2>
        <Link to="/books/create" className="btn btn-primary">
          + New Book
        </Link>
      </div>

      {books.length === 0 && !loading ? (
        <div className="text-center text-gray-500">No books found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="card bg-base-100 shadow-lg">
              <figure>
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  className="h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{book.title}</h3>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <p className="text-sm">
                  Categories: {book.categories.map(c => c.name).join(', ')}
                </p>
                <p className="text-sm">Duration: {book.durationMinutes} min</p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/books/${book.id}/edit`}
                    className="btn btn-outline btn-sm"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/books/${book.id}/pages`}
                    className="btn btn-outline btn-sm"
                  >
                    Manage Pages
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLast && (
        <div className="text-center mt-8">
          <button
            onClick={loadBooks}
            className={`btn btn-secondary ${loading ? 'btn-disabled' : ''}`}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookList;
