import { countNews, createService, findAllService, findByIdService } from '../services/chapter.service.js';

const create = async (req, res) => {

    try {
        const { title, text, section } = req.body;

        if (!req.body) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        if (!title || !text || !section) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        await createService({
            title,
            text,
            section,
            author: req.userId
        });

        res.status(201).send({ message: "Chapter created!" });

    } catch (err) { res.status(500).send({ message: err.message }) };
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

        const chapters = await findAllService(offset, limit);
        const total = await countNews();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previus = offset - limit < 0 ? null : offset - limit;
        const previusUrl = previus != null ? `${currentUrl}?limit=${limit}&offset=${previus}` : null;

        if (chapters.length === 0) {
            return res.status(400).send({ message: " There are no registered Chapters" })
        };

        res.send({
            nextUrl,
            previusUrl,
            limit,
            offset,
            total,

            results: chapters.map((item) => ({
                id: item._id,
                text: item.text,
                author: item.author,
                section: item.section,
            })),
        });

    } catch (err) { res.status(500).send({ message: err.message }) };
};

const findById = async (req, res) => {
    try {

    } catch (err) { res.status(500).send({ message: err.message }) };
};

export default { create, findAll, findById }; 