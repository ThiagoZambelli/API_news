import Section from "../models/Section.js";

const createService = (body) => Section.create(body);
const findAllService = (offset, limit) => Section.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("author").populate("chapters").populate("campaign");
const findByIdService = (sectionId) => Section.findById(sectionId).populate("author").populate("chapters").populate("campaign");
const updateService = (id,
    title,
    chapters) => Section.findOneAndUpdate(
        { _id: id },
        { title, chapters });
const countSection = () => Section.countDocuments();

const searchByTitleService = (title) => Section.find({
    title: { $regex: `${title || ""}`, $options: "i" }
}).sort({ _id: -1 }).populate("author").populate("chapters").populate("campaign");
const findByAuthorService = (authorId) => Section.find({ author: authorId }).sort({ _id: -1 }).populate("author").populate("chapters").populate("campaign");

export { createService, findAllService, findByIdService, updateService, countSection, searchByTitleService, findByAuthorService };