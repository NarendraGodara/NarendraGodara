import { useEffect, useState } from 'react';
import { createPlaylist, getPlaylists, updateVideoStatus } from './api/playlists';
import PlaylistForm from './components/PlaylistForm';
import DashboardSummary from './components/DashboardSummary';
import PlaylistCard from './components/PlaylistCard';

export default function App() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadPlaylists = async () => {
    try {
      setError('');
      const data = await getPlaylists();
      setPlaylists(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load playlists');
    }
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  const handleAdd = async (payload) => {
    try {
      setLoading(true);
      setError('');
      const playlist = await createPlaylist(payload);
      setPlaylists((prev) => [playlist, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add playlist');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (playlistId, videoId, completed) => {
    const snapshot = playlists;

    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist._id !== playlistId
          ? playlist
          : {
              ...playlist,
              videos: playlist.videos.map((video) =>
                video._id !== videoId ? video : { ...video, completed }
              )
            }
      )
    );

    try {
      setSaving(true);
      const updatedPlaylist = await updateVideoStatus(playlistId, videoId, completed);
      setPlaylists((prev) =>
        prev.map((playlist) => (playlist._id === playlistId ? updatedPlaylist : playlist))
      );
    } catch (err) {
      setPlaylists(snapshot);
      setError(err.response?.data?.message || 'Failed to update progress');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-slate-900">YouTube Playlist Progress Tracker</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        <DashboardSummary playlists={playlists} />
        <PlaylistForm onAdd={handleAdd} loading={loading} />

        {saving && <p className="text-sm text-slate-500">Saving changes...</p>}

        <section className="grid lg:grid-cols-2 gap-6">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist._id}
              playlist={playlist}
              onToggleVideo={handleToggle}
              busy={saving}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
