import React, { useEffect, useState } from 'react';
import { uploadFile } from '../services/fileService';
import { getCategories } from '../services/categoryService';
import type { CreateBookDto } from '../types';

interface CategoryDto {
  id: number;
  name: string;
}

interface Props {
  initialData?: Partial<CreateBookDto & { coverImageUrl?: string }>;
  onSubmit: (dto: CreateBookDto) => Promise<void>;
  submitLabel?: string;
}

const BookForm: React.FC<Props> = ({ initialData = {}, onSubmit, submitLabel = 'Submit' }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [author, setAuthor] = useState(initialData.author || '');
  const [duration, setDuration] = useState<number | ''>(initialData.durationMinutes || '');
  const [categoryIds, setCategoryIds] = useState<string[]>(initialData?.categoryIds || []);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState(initialData.coverImageUrl || '');
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => alert('Failed to load categories'));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !author || !duration || !categories || categories.length==0) {
      return alert('Please fill all fields.');
    }

    setLoading(true);
    try {
      let finalCoverUrl = coverImageUrl;
      if (coverFile) {
        finalCoverUrl = await uploadFile(coverFile);
      }

      const dto: CreateBookDto = {
        title,
        author,
        durationMinutes: Number(duration),
        categoryIds,
        coverImageUrl: finalCoverUrl,
      };

      await onSubmit(dto);
    } catch (err) {
      console.error(err);
      alert('Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-base-100 p-6 rounded-lg shadow-lg mt-10">
      <input
        type="text"
        placeholder="Title"
        className="input input-bordered w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Author"
        className="input input-bordered w-full mb-4"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        type="number"
        placeholder="Duration (minutes)"
        className="input input-bordered w-full mb-4"
        value={duration}
        onChange={(e) => setDuration(e.target.value === '' ? '' : Number(e.target.value))}
      />

   
      <select
  multiple
  className="form-select w-full h-40 p-2 border border-base-300 rounded-md bg-base-100 focus:outline-none"
  value={categoryIds}
  onChange={(e) =>
    setCategoryIds(Array.from(e.target.selectedOptions).map((opt) => opt.value))
  }
>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id.toString()}>
      {cat.name}
    </option>
  ))}
</select>


      <input
        type="file"
        accept="image/*"
        className="file-input file-input-bordered w-full mb-6"
        onChange={handleFileChange}
      />

      <button
        className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Saving…' : submitLabel}
      </button>
    </div>
  );
};

export default BookForm;
