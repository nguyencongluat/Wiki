import { Link } from 'react-router-dom';
import { Folder } from 'lucide-react';
import { getWikiData } from '../lib/wiki-fs';

export default function Home() {
  const topics = getWikiData();

  const colors = [
    'bg-red-50 border-red-200 text-red-600',
    'bg-green-50 border-green-200 text-green-600',
    'bg-blue-50 border-blue-200 text-blue-600',
    'bg-purple-50 border-purple-200 text-purple-600',
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-indigo-900">Explore Student Wikis</h1>
        <p className="text-xl text-indigo-600/80">
            Create a folder in <code>src/wiki/MyTopic</code> to start your own!
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {topics.map((topic, index) => {
          const colorClass = colors[index % colors.length];
          return (
            <Link 
              key={topic.name} 
              to={`/wiki/${topic.name}/Home`}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 p-6 border-2 border-transparent hover:border-indigo-300 flex flex-col h-full group"
            >
              <div className={`p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 text-3xl font-bold shadow-sm ${colorClass}`}>
                <Folder size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">{topic.name}</h2>
              <p className="text-gray-500 font-medium mb-6 flex-1 leading-relaxed">
                  {topic.pages.length} Pages
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
