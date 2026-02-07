export default function DiamondMining() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-extrabold text-cyan-600 mb-6 flex items-center gap-3">
        <span className="animate-bounce">💎</span> Ultimate Diamond Guide
      </h1>

      <section className="mb-8">
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          Finding diamonds is the most exciting part of Minecraft! Here is the best strategy for version 1.20+.
        </p>
        
        <div className="bg-gray-900 text-white p-6 rounded-2xl font-mono text-lg shadow-2xl border-4 border-gray-700">
          <div className="text-gray-500 mb-2">// Best Coordinates</div>
          <div>Y = -58</div>
          <div className="text-green-400 mt-2">// Technique</div>
          <div>Strip Mining (digging long straight tunnels)</div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <ToolCard name="Iron Pickaxe" color="bg-gray-300 border-gray-400" note="Minimum required" />
        <ToolCard name="Fortune III" color="bg-purple-200 border-purple-300 text-purple-900" note="Get more drops!" />
        <ToolCard name="Water Bucket" color="bg-blue-200 border-blue-300 text-blue-900" note="For lava safety" />
      </div>

      <div className="bg-orange-100 border-l-8 border-orange-500 p-6 rounded-r-xl">
        <h3 className="font-bold text-orange-900 text-lg mb-2">🔥 Warning: Lava Lakes!</h3>
        <p className="text-orange-800">
          At Y level -54 and below, lava lakes are very common. Always carry a water bucket (`Right Click` to place water) to turn lava into obsidian!
        </p>
      </div>
    </div>
  );
}

function ToolCard({ name, color, note }: any) {
  return (
    <div className={`${color} border-b-4 p-4 rounded-xl text-center`}>
      <div className="font-bold text-lg mb-1">{name}</div>
      <div className="text-xs opacity-75 font-bold uppercase">{note}</div>
    </div>
  );
}
