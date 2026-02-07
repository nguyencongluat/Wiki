import { Github, Users, Code, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-12 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">About WikiHub</h1>
        <p className="text-xl opacity-90">A collaborative knowledge base powered by the community.</p>
      </div>
      
      <div className="p-8 md:p-12 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Users className="text-blue-600" />
            <span>The Team</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg text-center border hover:shadow-md transition">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  U{i}
                </div>
                <h3 className="font-bold text-gray-900">User {i}</h3>
                <p className="text-sm text-gray-500 mt-2">Wiki Maintainer</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
            <div>
                 <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Code className="text-green-600" />
                    <span>Tech Stack</span>
                </h2>
                <ul className="space-y-3">
                    {['React + TypeScript', 'Tailwind CSS', 'Python Flask', 'SQLite + SQLAlchemy', 'Vite'].map((tech) => (
                        <li key={tech} className="flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-2 rounded">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            {tech}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <BookOpen className="text-purple-600" />
                    <span>Features</span>
                </h2>
                <ul className="space-y-3">
                    {[
                        'Multi-User authentication', 
                        'Topic-based Wiki management', 
                        'Markdown & Rich Media support', 
                        'Real-time content updates'
                    ].map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-2 rounded">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            {feat}
                        </li>
                    ))}
                </ul>
            </div>
        </section>

        <div className="text-center pt-8 border-t">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition font-medium"
          >
            <Github size={20} />
            <span>View Source on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
