import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import api from '../lib/axios';
import { Calendar } from 'lucide-react';

interface PageContent {
  id: number;
  title: string;
  content: string;
  updated_at: string;
}

export default function WikiPage() {
  const { slug } = useParams();
  const [page, setPage] = useState<PageContent | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
        setPage(null);
        setError('');
        api.get(`/pages/${slug}`)
           .then((res) => setPage(res.data))
           .catch(() => setError('Page not found'));
    }
  }, [slug]);

  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-8 text-center">
        <h2 className="text-xl font-bold mb-2">404</h2>
        <p>{error}</p>
    </div>
  );

  if (!page) return <div className="animate-pulse p-8 space-y-4">
    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>;

  return (
    <div className="bg-white rounded-3xl shadow-sm border-2 border-indigo-50 p-10 min-h-[600px]">
      <header className="mb-8 pb-6 border-b-2 border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">{page.title}</h1>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-400 bg-gray-50 inline-flex px-3 py-1 rounded-full">
            <Calendar size={14} />
            <span>Updated: {new Date(page.updated_at).toLocaleDateString()}</span>
        </div>
      </header>
      
      <article className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-headings:text-indigo-900 prose-a:text-blue-500 hover:prose-a:text-blue-600 prose-img:rounded-2xl prose-img:shadow-md">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{page.content}</ReactMarkdown>
      </article>
    </div>
  );
}
