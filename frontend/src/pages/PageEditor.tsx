import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import api from '../lib/axios';

interface Category {
  id: number;
  name: string;
}

interface Topic {
  id: number;
  categories: Category[];
}

export default function PageEditor() {
  const { topic } = useOutletContext<{ topic: Topic }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('# Heading\n\nWrite your content here...');
  const [categoryId, setCategoryId] = useState<number>(topic.categories[0]?.id || 0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/pages', {
        topic_id: topic.id,
        category_id: categoryId,
        title,
        content
      });
      navigate(`/wiki/${topic.id}/page/${data.slug}`);
      // Force reload or re-fetch would be better in a real app (React Query)
      window.location.reload(); 
    } catch (err) {
      alert('Failed to save page');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border-2 border-indigo-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-indigo-900">✨ Create New Page</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Page Title</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-lg"
              placeholder="e.g., The Legendary Sword"
            />
          </div>
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
             <select 
               value={categoryId}
               onChange={(e) => setCategoryId(Number(e.target.value))}
               className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-lg appearance-none cursor-pointer"
             >
               {topic.categories.map(c => (
                 <option key={c.id} value={c.id}>{c.name}</option>
               ))}
             </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Content <span className="text-gray-400 font-normal">(Markdown Supported - Use **bold**, *italics*, etc.)</span>
          </label>
          <textarea
            required
            rows={15}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 font-mono text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
            placeholder="# Start writing your amazing content here..."
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-gray-500 hover:bg-gray-100 rounded-xl font-bold transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : '🚀 Publish Page'}
          </button>
        </div>
      </form>
    </div>
  );
}
