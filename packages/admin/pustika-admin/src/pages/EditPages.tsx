import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getPagesAdmin,
  addPageAdmin,
  updatePageAdmin,
  deletePageAdmin,
  generateAudio,
} from '../services/bookService';
import type { BookPageDto, CreateOrUpdatePageDto } from '../types';
import RichTextEditor from '../components/RichTextEditor';

const EditPages: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);

  const [pages, setPages] = useState<BookPageDto[]>([]);
  const [editing, setEditing] = useState<BookPageDto | null>(null);
  const [newPage, setNewPage] = useState<CreateOrUpdatePageDto>({
    pageNumber: 1,
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [generatingPage, setGeneratingPage] = useState<number | null>(null);

  useEffect(() => {
    if (!bookId) return;
    fetchPages();
  }, [bookId]);

  const fetchPages = async () => {
    try {
      const data = await getPagesAdmin(bookId);
      setPages(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load pages');
    }
  };

  const handleGenerateAudio = async (pageNumber: number) => {
    if (!bookId) return;
    setGeneratingPage(pageNumber);
    try {
      await generateAudio(bookId, pageNumber);
      await fetchPages();
    } catch (err) {
      console.error(err);
      alert('Failed to generate audio');
    } finally {
      setGeneratingPage(null);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const dto = editing
        ? { pageNumber: editing.pageNumber, content: editing.content }
        : newPage;

      if (editing) {
        await updatePageAdmin(bookId, editing.pageNumber, dto);
        setEditing(null);
      } else {
        await addPageAdmin(bookId, dto);
        setNewPage({ pageNumber: newPage.pageNumber + 1, content: '' });
      }

      await fetchPages();
    } catch (err) {
      console.error(err);
      alert('Error saving page');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pageNumber: number) => {
    if (!window.confirm(`Delete page ${pageNumber}?`)) return;
    try {
      await deletePageAdmin(bookId, pageNumber);
      fetchPages();
    } catch (err) {
      console.error(err);
      alert('Error deleting page');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Manage Pages for Book #{bookId}
      </h2>

      <ul className="space-y-4 mb-8">
        {pages.map((page) => (
          <li key={page.pageNumber} className="border rounded-lg bg-base-100 shadow-sm">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-semibold">Page {page.pageNumber}</span>
              <div className="space-x-2">
                <button className="btn btn-xs btn-outline" onClick={() => setEditing(page)}>
                  Edit
                </button>
                <button className="btn btn-xs btn-error" onClick={() => handleDelete(page.pageNumber)}>
                  Delete
                </button>
                <button
                  className={`btn btn-xs ${generatingPage === page.pageNumber ? 'loading' : 'btn-accent'}`}
                  onClick={() => handleGenerateAudio(page.pageNumber)}
                  disabled={generatingPage === page.pageNumber}
                >
                  🎙️ {generatingPage === page.pageNumber ? 'Generating...' : 'Generate Audio'}
                </button>
              </div>
            </div>
            <div className="p-4 prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
              {page.audioUrl && (
                <div className="mt-4">
                  <audio controls src={page.audioUrl} className="w-full" />
                </div>
              )}
              {page.speechMarksUrl && (
                <div className="mt-2 text-sm text-gray-500">
                  <a
                    href={page.speechMarksUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    View Speech Marks JSON
                  </a>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="bg-base-100 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">
          {editing ? `Edit Page ${editing.pageNumber}` : 'Add New Page'}
        </h3>

        {!editing && (
          <input
            type="number"
            className="input input-bordered w-24 mb-4"
            value={newPage.pageNumber}
            onChange={(e) => setNewPage({ ...newPage, pageNumber: Number(e.target.value) || 1 })}
            placeholder="Page #"
            min={1}
          />
        )}

        <RichTextEditor
          content={editing ? editing.content : newPage.content}
          onChange={(html) => {
            if (editing) setEditing({ ...editing, content: html });
            else setNewPage({ ...newPage, content: html });
          }}
        />

        <div className="mt-4 flex items-center">
          <button
            className={`btn btn-primary ${loading ? 'loading' : ''}`}
            onClick={handleSave}
            disabled={loading}
          >
            {editing ? 'Save Changes' : 'Add Page'}
          </button>
          {editing && (
            <button className="btn btn-ghost ml-4" onClick={() => setEditing(null)}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPages;
