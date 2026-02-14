import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    youtubeVideoId: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    completed: { type: Boolean, default: false }
  },
  { _id: true }
);

const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    youtubePlaylistId: { type: String, required: true, index: true },
    playlistUrl: { type: String, required: true },
    videos: [videoSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Playlist', playlistSchema);
