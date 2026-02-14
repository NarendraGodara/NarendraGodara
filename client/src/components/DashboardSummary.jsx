import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#22c55e', '#ef4444'];

export default function DashboardSummary({ playlists }) {
  const totals = playlists.reduce(
    (acc, playlist) => {
      const total = playlist.videos.length;
      const completed = playlist.videos.filter((v) => v.completed).length;
      acc.total += total;
      acc.completed += completed;
      return acc;
    },
    { total: 0, completed: 0 }
  );

  const remaining = totals.total - totals.completed;
  const progress = totals.total ? Math.round((totals.completed / totals.total) * 100) : 0;

  const data = [
    { name: 'Completed', value: totals.completed },
    { name: 'Remaining', value: remaining }
  ];

  return (
    <section className="bg-white rounded-xl border shadow-sm p-6 grid md:grid-cols-2 gap-6 items-center">
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={65} outerRadius={95} stroke="none" label>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        <Stat label="Total Videos" value={totals.total} />
        <Stat label="Completed" value={totals.completed} />
        <Stat label="Remaining" value={remaining} />
        <Stat label="Overall Progress" value={`${progress}%`} />
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-3 border rounded-lg bg-slate-50">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
