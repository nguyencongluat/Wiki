import { NavLink, useParams } from 'react-router-dom';
import { Layers, FileText } from 'lucide-react';
import { getWikiData } from '../lib/wiki-fs';

export default function WikiLayout() {
  const { topicName, "*": pagePath } = useParams();
  const topics = getWikiData();
  const currentTopic = topics.find(t => t.name === topicName);
  
  if (!currentTopic) {
      return <div className="p-10 text-center text-red-500 font-bold">Topic "{topicName}" not found. Check your folder name!</div>;
  }

  // Handle Home redirect case if needed, though App.tsx handles root
  const targetPage = pagePath || 'Home';
  const currentPage = currentTopic.pages.find(p => p.name === targetPage);
  const PageComponent = currentPage ? currentPage.component : null;

  if (currentTopic.Layout) {
      const CustomLayout = currentTopic.Layout;
      return (
          <CustomLayout currentTopic={currentTopic}>
              {PageComponent ? <PageComponent /> : (
                  <div className="p-10 text-center text-red-400 border-2 border-dashed border-red-200 rounded-xl">
                      Page "{targetPage}" not found.
                  </div>
              )}
          </CustomLayout>
      );
  }

  // Default Layout
  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-full md:w-72 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border-2 border-indigo-100 p-6 sticky top-24">
          <div className="mb-6 pb-6 border-b-2 border-indigo-50">
            <h1 className="text-2xl font-bold text-indigo-900 leading-tight">{topicName}</h1>
            <p className="text-sm text-indigo-500 mt-2 font-medium">Student Wiki Project</p>
          </div>

          <nav className="space-y-6">
              <div>
                <h3 className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-3 flex items-center gap-2 px-2">
                  <Layers size={14} /> Pages
                </h3>
                <ul className="space-y-2">
                  {currentTopic.pages.map((page) => (
                    <li key={page.name}>
                      <NavLink
                        to={`/wiki/${topicName}/${page.name}`}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                            isActive
                              ? 'bg-blue-100 text-blue-700 translate-x-1'
                              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <FileText size={16} className={`transition-transform ${isActive ? 'text-blue-500' : 'text-gray-300'}`} />
                            <span className="truncate">{page.name}</span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 bg-white rounded-3xl shadow-sm border-2 border-indigo-50 p-10 min-h-[600px]">
        {PageComponent ? (
            <PageComponent />
        ) : (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-400">Page Not Found</h2>
                <p className="text-gray-400 mt-2">Create a file named <code>{targetPage}.tsx</code> in <code>src/wiki/{topicName}/</code></p>
            </div>
        )}
      </div>
    </div>
  );
}
