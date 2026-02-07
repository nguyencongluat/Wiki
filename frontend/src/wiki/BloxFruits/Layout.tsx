import { NavLink } from 'react-router-dom';
import { Skull, Swords, Ship, Home } from 'lucide-react';

export default function BloxFruitsLayout({ children }: any) {
  const links = [
    { name: 'Home', icon: Home, path: 'Home' },
    { name: 'Tier List', icon: Swords, path: 'TierList' },
    { name: 'Sea Events', icon: Ship, path: 'SeaEvents' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
        {/* Custom Header for Blox Fruits */}
        <div className="bg-blue-900 text-white p-4 border-b-4 border-blue-700 flex items-center justify-between sticky top-0 z-20 shadow-xl">
            <h1 className="text-2xl font-black italic tracking-wider flex items-center gap-2">
                <Skull /> BLOX FRUITS WIKI
            </h1>
            <div className="text-xs font-bold bg-blue-800 px-3 py-1 rounded">UNOFFICIAL</div>
        </div>

        <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
            {/* Custom Sidebar */}
            <aside className="w-full md:w-64 bg-slate-800 rounded-xl p-4 border border-slate-700 h-fit sticky top-24">
                <nav className="space-y-2">
                    {links.map(link => (
                        <NavLink 
                            key={link.name}
                            to={`/wiki/BloxFruits/${link.path}`}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all
                                ${isActive 
                                    ? 'bg-blue-600 text-white shadow-lg translate-x-1' 
                                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'}
                            `}
                        >
                            <link.icon size={18} />
                            {link.name}
                        </NavLink>
                    ))}
                    
                    <div className="mt-6 pt-6 border-t border-slate-700">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2 px-2">Recent Updates</p>
                        <div className="px-2 text-sm text-slate-400">
                            • Update 20 released!<br/>
                            • Shark Anchor added.<br/>
                            • Kitsune fruit leaked.
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Content Area */}
            <main className="flex-1 bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 min-h-[80vh]">
                {children}
            </main>
        </div>
    </div>
  );
}
