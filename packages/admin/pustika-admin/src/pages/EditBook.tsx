import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateBookAdmin, getBookById } from '../services/bookService';
import BookForm from '../components/BookForm';

const EditBook: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBookById(Number(id)).then(setBook);
  }, [id]);

  const handleUpdate = async (dto) => {
    await updateBookAdmin(Number(id), dto);
    alert('Book updated successfully!');
    navigate('/books');
  };

  if (!book) return <div className="p-6 text-center">Loading…</div>;

  return <BookForm onSubmit={handleUpdate} initialData={book} submitLabel="Update Book" />;
};

export default EditBook;
