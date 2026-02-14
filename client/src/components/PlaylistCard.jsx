export default function PlaylistCard({ playlist, onToggleVideo, busy }) {
  const completed = playlist.videos.filter((v) => v.completed).length;
  const total = playlist.videos.length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <article className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-slate-900 text-lg">{playlist.name}</h3>
        <p className="text-sm text-slate-500 mt-1">{completed} / {total} Completed</p>
        <div className="w-full h-2 rounded-full bg-slate-100 mt-3">
          <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <ul className="divide-y">
        {playlist.videos.map((video) => (
          <li key={video._id} className="p-3 flex items-center gap-3">
            <input
              type="checkbox"
              checked={video.completed}
              onChange={(e) => onToggleVideo(playlist._id, video._id, e.target.checked)}
              disabled={busy}
              className="h-4 w-4 accent-indigo-600"
            />
            <a
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className={`text-sm flex-1 hover:underline ${video.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}
            >
              {video.title}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
