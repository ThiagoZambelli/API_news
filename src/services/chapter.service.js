import Chapter from "../models/Chapter.js";

const createService = (body) => Chapter.create(body);
const findAllService = () => Chapter.find();
const findByIdService = (chapterId) => Chapter.findById(chapterId);

export default { createService, findAllService, findByIdService };