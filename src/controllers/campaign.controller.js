import { createService, findAllService, findByIdService } from '../services/campaign.service.js';

const create = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!req.body) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        if (!title || !description) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        await createService({
            title,
            description,
            author: "69f3a1c7cef2f5bdb8c89677"
        });

        res.status(201).send({ message: "Campaign created!" });

    } catch (err) { res.status(500).send({ message: err.message }) };
};

const findAll = async (req, res) => {
    try {
        const campaign = await findAllService();

        if (campaign.length === 0) {
            return res.status(400).send({ message: " There are no registered Campaign" })
        };

        res.send(campaign);

    } catch (err) { res.status(500).send({ message: err.message }) };
};

const findById = async (req, res) => {
    try {

    } catch (err) { res.status(500).send({ message: err.message }) };
};

export default { create, findAll, findById }; 