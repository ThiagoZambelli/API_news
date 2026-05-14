import mongoose from 'mongoose';

const Chapter = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        require: true
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        require: true
    },

});

const Chapter = mongoose.model("Chapter", ChapterSchema);

export default Chapter;