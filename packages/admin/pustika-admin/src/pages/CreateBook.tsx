import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { createBook } from '../services/bookService';

const CreateBook: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = async (dto) => {
    await createBook(dto);
    alert('Book created successfully!');
    navigate('/books');
  };

  return <BookForm onSubmit={handleCreate} submitLabel="Create Book" />;
};

export default CreateBook;
