import { createService, findAllService, findByIdService } from '../services/chapter.service.js';

const create = async (req, res) => {
    try {
        const { title, text, campaign, section } = req.body;

        if (!req.body) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        if (!title || !text || !campaign || !section) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        await createService({
            title,
            text,
            campaign,
            section,
            author: "fake id"
        });

        res.status(201).send({ message: "Chapter created!" });

    } catch (err) { res.status(500).send({ message: err.message }) };
};

const findAll = async (req, res) => {
    try {
        const chapters = await findAllService();

        if (chapters.length === 0) {
            return res.status(400).send({ message: " There are no registered Chapters" })
        };

        res.send(chapters);

    } catch (err) { res.status(500).send({ message: err.message }) };
};

const findById = async (req, res) => {
    try {

    } catch (err) { res.status(500).send({ message: err.message }) };
};

export default { create, findAll, findById }; 