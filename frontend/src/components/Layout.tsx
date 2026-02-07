import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-sky-50 flex flex-col font-display">
      <header className="bg-white border-b-4 border-b-blue-400 py-4 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-blue-600 hover:scale-105 transition-transform flex items-center gap-2">
            <span className="bg-yellow-400 text-white rounded-lg px-2 py-1 transform -rotate-3 text-2xl">Wiki</span>
            <span className="text-blue-500">Hub</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/about" className="font-bold text-gray-500 hover:text-blue-500 transition hover:bg-blue-50 px-3 py-2 rounded-lg">
                About
            </Link>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold text-sm">
                Student Mode
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t-4 border-t-indigo-200 py-8 text-center text-gray-500 font-medium">
        <p className="flex items-center justify-center gap-2">
          Made with <span className="text-red-500 animate-pulse">❤️</span> for Learning
        </p>
      </footer>
    </div>
  );
}
