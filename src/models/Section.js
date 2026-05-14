import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    chapters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter"
        }
    ],
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true
    }
},
    {
        timestamps: true
    });

const Section = mongoose.model("Section", SectionSchema);

export default Section;