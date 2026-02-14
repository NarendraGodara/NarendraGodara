import { useState } from 'react';

export default function PlaylistForm({ onAdd, loading }) {
  const [name, setName] = useState('');
  const [playlistUrl, setPlaylistUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !playlistUrl.trim()) return;

    await onAdd({ name: name.trim(), playlistUrl: playlistUrl.trim() });
    setName('');
    setPlaylistUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-5 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
      <div>
        <label className="block text-sm text-slate-600 mb-2">Playlist Name</label>
        <input
          className="w-full h-11 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="e.g. React Mastery"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-2">YouTube Playlist URL</label>
        <input
          className="w-full h-11 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="https://www.youtube.com/playlist?list=..."
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="h-11 px-5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-60"
      >
        {loading ? 'Adding...' : 'Add Playlist'}
      </button>
    </form>
  );
}
