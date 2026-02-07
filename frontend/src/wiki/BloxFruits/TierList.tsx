import { useState } from 'react';
import { X, Trophy, Swords, Zap, Skull } from 'lucide-react';

export default function FruitTierList() {
  const [selectedFruit, setSelectedFruit] = useState<any>(null);

  const fruits = [
    { 
      name: 'Leopard', 
      tier: 'S', 
      price: '5,000,000', 
      type: 'Beast',
      desc: 'Transforms into a powerful Leopard. Extremely high mobility and damage. The King of PvP.',
      stats: { damage: 10, speed: 10, range: 6 }
    },
    { 
      name: 'Dough', 
      tier: 'S', 
      price: '2,800,000', 
      type: 'Elemental',
      desc: 'Awakened Dough is a combo machine. Stuns enemies and deals massive damage.',
      stats: { damage: 9, speed: 7, range: 8 }
    },
    { 
      name: 'Dragon', 
      tier: 'S', 
      price: '3,500,000', 
      type: 'Beast',
      desc: 'Transforms into a massive dragon. huge AoE attacks and damage reduction.',
      stats: { damage: 9, speed: 6, range: 10 }
    },
    { 
      name: 'Spirit', 
      tier: 'A', 
      price: '3,400,000', 
      type: 'Natural',
      desc: 'Summons spirits (Ice and Fire) to fight for you. Very versatile.',
      stats: { damage: 8, speed: 7, range: 8 }
    },
    { 
      name: 'Venom', 
      tier: 'A', 
      price: '3,000,000', 
      type: 'Natural',
      desc: 'Spreads poison that deals damage over time. Great for boss fights.',
      stats: { damage: 8, speed: 8, range: 7 }
    },
    { 
      name: 'Buddha', 
      tier: 'S', 
      price: '1,200,000', 
      type: 'Beast',
      desc: 'Become a giant golden deity. The absolute BEST fruit for grinding levels.',
      stats: { damage: 6, speed: 4, range: 10 }
    },
  ];

  return (
    <div className="space-y-6 relative">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-3xl text-white shadow-lg">
        <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
            <Trophy className="text-yellow-300" size={40} /> Fruit Tier List
        </h1>
        <p className="text-white/80 text-lg">Click on a fruit to see details!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* List View */}
        <div className="grid gap-4">
            {fruits.map((fruit) => (
            <button 
                key={fruit.name} 
                onClick={() => setSelectedFruit(fruit)}
                className={`group border-2 p-4 rounded-2xl flex items-center justify-between transition-all hover:scale-102
                    ${selectedFruit?.name === fruit.name 
                        ? 'bg-blue-50 border-blue-500 shadow-md transform scale-102' 
                        : 'bg-white border-gray-100 hover:border-purple-200 hover:shadow-md'}`}
            >
                <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-sm
                    ${fruit.tier === 'S' ? 'bg-gradient-to-br from-red-500 to-pink-600' : 'bg-gradient-to-br from-orange-400 to-yellow-500'}`}>
                    {fruit.tier}
                </div>
                <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{fruit.name}</h3>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{fruit.type}</span>
                </div>
                </div>
                <div className="font-mono font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                ${fruit.price}
                </div>
            </button>
            ))}
        </div>

        {/* Detail View */}
        <div className="sticky top-24">
            {selectedFruit ? (
                <div className="bg-white border-2 border-blue-500 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 mb-1">{selectedFruit.name}</h2>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-white font-bold text-sm shadow-sm
                                    ${selectedFruit.tier === 'S' ? 'bg-red-500' : 'bg-orange-500'}`}>
                                    Tier {selectedFruit.tier}
                                </span>
                                <span className="text-gray-400 font-bold">•</span>
                                <span className="text-blue-600 font-bold">{selectedFruit.type}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setSelectedFruit(null)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {selectedFruit.desc}
                    </p>

                    <div className="space-y-4">
                        <StatBar icon={<Swords size={20} />} label="Damage" value={selectedFruit.stats.damage} color="bg-red-500" />
                        <StatBar icon={<Zap size={20} />} label="Speed" value={selectedFruit.stats.speed} color="bg-yellow-400" />
                        <StatBar icon={<Skull size={20} />} label="Range" value={selectedFruit.stats.range} color="bg-purple-500" />
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <button className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition transform hover:-translate-y-1 shadow-lg">
                            Wiki Page for {selectedFruit.name} →
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center text-gray-400 h-full flex flex-col items-center justify-center min-h-[400px]">
                    <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
                        <Trophy size={48} className="text-gray-300" />
                    </div>
                    <p className="text-xl font-bold">Select a fruit</p>
                    <p className="text-sm mt-2">Click on any fruit from the list to view its stats and details.</p>
                </div>
            )}
        </div>
      </div>
      
      <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-2xl">
        <h3 className="font-bold text-yellow-800 mb-2">💡 Coding Lesson: State</h3>
        <p className="text-yellow-700">
          This page uses <code>useState</code> to remember which fruit you clicked! 
          It's like a memory box for your app.
        </p>
      </div>
    </div>
  );
}

function StatBar({ icon, label, value, color }: any) {
    return (
        <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm ${color.replace('bg-', 'bg-opacity-80 bg-')}`}>
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    <span>{label}</span>
                    <span>{value}/10</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                        className={`h-full ${color} transition-all duration-1000 ease-out`} 
                        style={{ width: `${value * 10}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
