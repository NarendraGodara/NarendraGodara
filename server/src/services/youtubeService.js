import axios from 'axios';

const API_BASE = 'https://www.googleapis.com/youtube/v3';

export function extractPlaylistId(inputUrl) {
  try {
    const parsed = new URL(inputUrl);
    if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) {
      return parsed.searchParams.get('list') || '';
    }
  } catch {
    return '';
  }
  return '';
}

export async function fetchPlaylistVideosFromYouTube(playlistId, apiKey) {
  if (!playlistId) throw new Error('Invalid playlist id');
  if (!apiKey) throw new Error('YT_API_KEY is required');

  let pageToken = '';
  const videos = [];

  do {
    const { data } = await axios.get(`${API_BASE}/playlistItems`, {
      params: {
        part: 'snippet,contentDetails',
        maxResults: 50,
        playlistId,
        pageToken,
        key: apiKey
      }
    });

    for (const item of data.items || []) {
      const videoId = item.contentDetails?.videoId;
      const title = item.snippet?.title;
      if (!videoId || !title || title === 'Private video' || title === 'Deleted video') continue;

      videos.push({
        youtubeVideoId: videoId,
        title,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        completed: false
      });
    }

    pageToken = data.nextPageToken || '';
  } while (pageToken);

  if (!videos.length) {
    throw new Error('No videos found for this playlist');
  }

  return videos;
}
