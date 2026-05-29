import Chapter from "../models/Chapter.js";

const createService = (body) => Chapter.create(body);
const findAllService = (offset, limit) => Chapter.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("author").populate("section");
const findByIdService = (chapterId) => Chapter.findById(chapterId).populate("author").populate("section");;
const countChapter = () => Chapter.countDocuments();
const searchByTitleService = (title) => Chapter.find({
    title: { $regex: `${title || ""}`, $options: "i" }
}).sort({ _id: -1 }).populate("author").populate("section");
const findByAuthorService = (authorId) => Chapter.find({ author: authorId }).sort({ _id: -1 }).populate("author").populate("section");

export { createService, findAllService, findByIdService, countChapter, searchByTitleService, findByAuthorService };