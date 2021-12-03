import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    title: { type: String, required: true, uppercase: true, trim: true, minLength: 5 },
    description: { type: String, required: true, trim: true, maxLength: 80 },
    createdAt: { type: Date, required: true, default: Date.now, },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
    }
});

videoSchema.static('formatHashtags', function (hashtags) => hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`)));

const Video = mongoose.model("Video", videoSchema);
export default Video;