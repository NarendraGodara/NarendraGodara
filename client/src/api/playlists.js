import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export async function createPlaylist(payload) {
  const { data } = await api.post('/playlists', payload);
  return data;
}

export async function getPlaylists() {
  const { data } = await api.get('/playlists');
  return data;
}

export async function updateVideoStatus(playlistId, videoId, completed) {
  const { data } = await api.patch(`/playlists/${playlistId}/videos/${videoId}`, { completed });
  return data;
}
