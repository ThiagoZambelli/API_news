import Campaign from "../models/Campaign.js";

const createService = (body) => Campaign.create(body);
const findAllService = () => Campaign.find();
const findByIdService = (campaignId) => Campaign.findById(campaignId);
const updateService = (id,
    title,
    description,
    sections) => Campaign.findOneAndUpdate(
        { _id: id },
        { title, description, sections });

export { createService, findAllService, findByIdService, updateService };