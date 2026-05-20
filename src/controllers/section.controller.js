import { countSection, createService, findAllService, findByIdService } from '../services/section.service.js';
import Campaign from "../models/Campaign.js";

const create = async (req, res) => {
    try {
        const { title, campaign } = req.body;

        if (!req.body) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        if (!title || !campaign) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        const section = await createService({
            title,
            campaign,
            author: req.userId
        });

        await Campaign.findByIdAndUpdate(
            campaign,
            {
                $push: {
                    sections: section._id,
                },
            },
            {
                returnDocument: "after",
            }
        );

        res.status(201).send({ message: "Section created!" });

    } catch (err) { return res.status(500).send({ message: err.message }) };
};

const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query;
        limit = Number(limit);
        offset = Number(offset);


        if (!limit) {
            limit = 5;
        };
        if (!offset) {
            offset = 0;
        };

        const sections = await findAllService(offset, limit);

        const total = await countSection();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previus = offset - limit < 0 ? null : offset - limit;
        const previusUrl = previus != null ? `${currentUrl}?limit=${limit}&offset=${previus}` : null;


        if (sections.length === 0) {
            return res.status(400).send({ message: " There are no registered Sections" })
        };

        res.send({
            nextUrl,
            previusUrl,
            limit,
            offset,
            total,

            results: sections.map((item) => ({
                id: item._id,
                title: item.title,
                chapters: item.chapters,
                author: item.author,
                campaign: item.campaign,
            })),
        });

    } catch (err) { return res.status(500).send({ message: err.message }) };
};

const findById = async (req, res) => {
    try {

    } catch (err) { return res.status(500).send({ message: err.message }) };
};

export default { create, findAll, findById }; 