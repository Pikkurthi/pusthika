import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BookList from './pages/BookList';
import CreateBook from './pages/CreateBook';
import EditPages from './pages/EditPages';
import CategoryList from './pages/CategoryList';
import EditBook from './pages/EditBook';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="books" element={<BookList />} />
      <Route path="books/create" element={<CreateBook />} />
      <Route path="books/:id/pages" element={<EditPages />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/books/:id/edit" element={<EditBook />} />

      <Route path="*" element={<div className="p-6">Page Not Found</div>} />
    </Route>
  </Routes>
);

export default App;
