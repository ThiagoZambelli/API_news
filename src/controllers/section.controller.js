import { createService, findAllService, findByIdService } from '../services/section.service.js';

const create = async (req, res) => {
    try {
        const { title, campaign } = req.body;

        if (!req.body) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        if (!title || !campaign) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        await createService({
            title,
            campaign,
            author: "fake id"
        });

        res.status(201).send({ message: "Section created!" });

    } catch (err) { res.status(500).send({ message: err.message }) };
};

const findAll = async (req, res) => {
    try {
        const sections = await findAllService();

        if (sections.length === 0) {
            return res.status(400).send({ message: " There are no registered Sections" })
        };

        res.send(sections);

    } catch (err) { res.status(500).send({ message: err.message }) };
};

const findById = async (req, res) => {
    try {

    } catch (err) { res.status(500).send({ message: err.message }) };
};

export default { create, findAll, findById }; 