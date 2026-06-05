import { updateService, searchByTitleService, countChapter, createService, findAllService, findByIdService, findByAuthorService } from '../services/chapter.service.js';
import Section from "../models/Section.js";

const create = async (req, res) => {

    try {
        const { title, text, section } = req.body;

        if (!req.body) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        if (!title || !text || !section) {
            res.status(400).send({ message: "submit all fields for Create" })
        };

        const chapter = await createService({
            title,
            text,
            section,
            author: req.userId
        });

        await Section.findByIdAndUpdate(
            section,
            {
                $push: {
                    chapters: chapter._id,
                },
            },
            {
                returnDocument: "after",
            }
        );

        res.status(201).send({ message: "Chapter created!" });

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

        const chapters = await findAllService(offset, limit);

        const total = await countChapter();
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
                title: item.title,
                text: item.text,
                author: item.author,
                section: item.section,
            })),
        });

    } catch (err) { return res.status(500).send({ message: err.message }) };
};

const findById = async (req, res) => {
    try {
        const { chapterId } = req.params;

        const chapter = await findByIdService(chapterId);
        if (!chapter) {
            return res.status(400).send({ message: "This chapter does not exist." })
        }

        return res.send({
            Chapter: {
                id: chapter._id,
                title: chapter.title,
                text: chapter.text,
                author: chapter.author,
                section: chapter.section,
            }
        });

    } catch (err) { return res.status(500).send({ message: err.message }) };
};

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        const chapters = await searchByTitleService(title);

        if (chapters.length === 0) {
            return res.status(400).send({ message: "There are no chapters with this title" })
        }

        res.send({
            results: chapters.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                author: item.author,
                section: item.section,
            }))
        });

    } catch (err) { return res.status(500).send({ message: err.message }) };
};

const findByAuthor = async (req, res) => {
    try {
        const authorId = req.id;

        if (!authorId) {
            return res.status(400).send({ message: "You need a valid ID" })
        }

        const chapters = await findByAuthorService(authorId);
        return res.send({
            results: chapters.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                author: item.author,
                section: item.section,
            }))
        });

    } catch (err) { return res.status(500).send({ message: err.message }) };
};

const update = async (req, res) => {
    try {
        const { title, text } = req.body;
        const { id } = req.params;

        const chapter = await findByIdService(id);       

        if (chapter.author._id != req.userId) {
            return res.status(400).send({ message: "This is not the author." });
        };

        if (!title && !text) {
            return res.status(400).send({ message: "No data to update" });
        };

        await updateService(id, title, text);

        return res.send({ message: "updated successfully" });

    } catch (err) { return res.status(500).send({ message: err.message }) };
};

export default { update, create, findAll, findById, searchByTitle, findByAuthor }; 