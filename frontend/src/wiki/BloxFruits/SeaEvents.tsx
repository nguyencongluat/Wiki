export default function SeaEvents() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-black text-blue-900">🌊 Sea Events Guide</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <EventCard 
          emoji="🦈"
          title="Terror Shark"
          danger="Extremely High"
          drops={['Mutated Tooth', 'Shark Anchor']}
          bg="bg-blue-900"
        />
        <EventCard 
          emoji="👻"
          title="Ghost Ship"
          danger="Medium"
          drops={['Ectoplasm', 'Fools Gold']}
          bg="bg-green-900"
        />
      </div>

      <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-100">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">How to Spawn?</h2>
        <ul className="list-disc pl-6 space-y-2 text-blue-700 font-medium">
          <li>Get a boat with high health (Beast Hunter is best).</li>
          <li>Drive into Danger Level 6 (???) zone.</li>
          <li>Wait for the sea to turn dark...</li>
        </ul>
      </div>
    </div>
  );
}

function EventCard({ emoji, title, danger, drops, bg }: any) {
  return (
    <div className={`${bg} text-white p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform`}>
      <div className="text-5xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="flex gap-2 mb-4">
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">⚠️ {danger}</span>
      </div>
      <div>
        <p className="text-white/60 text-sm mb-1 uppercase font-bold tracking-wider">Drops</p>
        <div className="flex flex-wrap gap-2">
          {drops.map((drop: string) => (
            <span key={drop} className="bg-black/30 px-2 py-1 rounded text-sm">{drop}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
