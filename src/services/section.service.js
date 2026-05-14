import Section from "../models/Section.js";

const createService = (body) => Section.create(body);
const findAllService = () => Section.find();
const findByIdService = (sectionId) => Section.findById(sectionId);
const updateService = (id,
    title,
    chapters) => Section.findOneAndUpdate(
        { _id: id },
        { title, chapters });

export { createService, findAllService, findByIdService, updateService };