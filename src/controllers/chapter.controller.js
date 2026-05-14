import { createService, findAllService, findByIdService } from '../services/chapter.service.js';

const create = async (req, res) => {
    try {
        const { title, text, description, campaign, section } = req.body;

        if (!title || !text || !description || !campaign || !section) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        await createService({
            title,
            text,
            description,
            campaign,
            section,
            author: "fake id"
        });

        res.status(201).send({message:"Chapter created!"});

    } catch (err) { res.satus(500).send({ message: err.message }) };
};

const findAll = async (req, res) => {
    try {

    } catch (err) { res.satus(500).send({ message: err.message }) };
};

const findById = async (req, res) => {
    try {

    } catch (err) { res.satus(500).send({ message: err.message }) };
};

export default { create, getAll, getById }; 