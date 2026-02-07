export default function Mobs() {
  const mobs = [
    { name: 'Creeper', type: 'Hostile', hp: 20, notes: 'Explodes when close. Fear of cats.' },
    { name: 'Enderman', type: 'Neutral', hp: 40, notes: 'Teleports. Don\'t look at eyes!' },
    { name: 'Axolotl', type: 'Passive', hp: 14, notes: 'Plays dead. Hunts tropical fish.' },
    { name: 'Warden', type: 'Boss', hp: 500, notes: 'Blind but hears vibrations. RUN!' },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-green-700 mb-8">👻 Mob Encyclopedia</h1>

      <div className="overflow-hidden bg-white shadow-xl rounded-2xl border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-500 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="p-4">Mob Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Health (HP)</th>
              <th className="p-4">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mobs.map((mob) => (
              <tr key={mob.name} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-800">{mob.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold
                    ${mob.type === 'Hostile' ? 'bg-red-100 text-red-700' : 
                      mob.type === 'Passive' ? 'bg-green-100 text-green-700' : 
                      mob.type === 'Boss' ? 'bg-purple-900 text-white' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {mob.type}
                  </span>
                </td>
                <td className="p-4 font-mono text-gray-600">
                    <div className="w-full bg-gray-200 rounded-full h-2 w-24 overflow-hidden">
                        <div className="bg-red-500 h-full" style={{ width: `${Math.min(mob.hp, 100)}%` }}></div>
                    </div>
                    <div className="text-xs mt-1">{mob.hp} HP</div>
                </td>
                <td className="p-4 text-gray-500 text-sm">{mob.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
