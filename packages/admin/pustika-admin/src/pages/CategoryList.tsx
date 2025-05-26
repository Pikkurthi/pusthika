import React, { useEffect, useState } from 'react';
import { getCategories, createCategory, deleteCategory } from '../services/categoryService';

interface CategoryDto {
  id: number;
  name: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories', err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return alert('Name is required');
    setLoading(true);
    try {
      await createCategory({ name });
      setName('');
      await load();
    } catch (err) {
      console.error('Create failed', err);
      alert('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await deleteCategory(id);
      await load();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete category');
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Book Categories</h2>
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          className="input input-bordered w-64"
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAdd} disabled={loading}>
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="text-gray-500">No categories found</div>
      ) : (
        <table className="table w-full bg-base-100 shadow">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.name}</td>
                <td className="text-right">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryList;
