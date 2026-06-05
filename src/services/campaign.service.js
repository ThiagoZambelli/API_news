import Campaign from "../models/Campaign.js";

const createService = (body) => Campaign.create(body);
const findAllService = (offset, limit) => Campaign.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("author").populate("sections");
const findByIdService = (campaignId) => Campaign.findById(campaignId).populate("author").populate("sections");
const updateService = (
    id,
    title,
    description,
    sections) => Campaign.findOneAndUpdate(
        { _id: id },
        { title, description, sections },
        { rawResult: true });
const countCampaign = () => Campaign.countDocuments();
const searchByTitleService = (title) => Campaign.find({
    title: { $regex: `${title || ""}`, $options: "i" }
}).sort({ _id: -1 }).populate("author").populate("sections");
const findByAuthorService = (authorId) => Campaign.find({ author: authorId }).sort({ _id: -1 }).populate("author").populate("sections");

export { createService, findAllService, findByIdService, updateService, countCampaign, searchByTitleService, findByAuthorService };