import { Router } from 'express';
import Playlist from '../models/Playlist.js';
import { extractPlaylistId, fetchPlaylistVideosFromYouTube } from '../services/youtubeService.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, playlistUrl } = req.body;

    if (!name || !playlistUrl) {
      return res.status(400).json({ message: 'name and playlistUrl are required' });
    }

    const playlistId = extractPlaylistId(playlistUrl);
    if (!playlistId) {
      return res.status(400).json({ message: 'Invalid YouTube playlist URL' });
    }

    const videos = await fetchPlaylistVideosFromYouTube(playlistId, process.env.YT_API_KEY);

    const playlist = await Playlist.create({
      name,
      playlistUrl,
      youtubePlaylistId: playlistId,
      videos
    });

    return res.status(201).json(playlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Failed to create playlist' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const playlists = await Playlist.find({}).sort({ createdAt: -1 });
    return res.json(playlists);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch playlists' });
  }
});

router.patch('/:id/videos/:videoId', async (req, res) => {
  try {
    const { id, videoId } = req.params;
    const { completed } = req.body;

    if (typeof completed !== 'boolean') {
      return res.status(400).json({ message: 'completed must be boolean' });
    }

    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    const video = playlist.videos.id(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    video.completed = completed;
    await playlist.save();

    return res.json(playlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to update video status' });
  }
});

export default router;
