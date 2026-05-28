import { searchByTitleService, countCampaign, createService, findAllService, findByIdService } from '../services/campaign.service.js';

const create = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!req.body) {
            return res.status(400).send({ message: "submit all fields for Create" })
        };

        if (!title || !description) {
            return res.status(400).send({ message: "submit all fields for Create" })
        };

        await createService({
            title,
            description,
            author: req.userId
        });

        res.status(201).send({ message: "Campaign created!" });

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


        const campaign = await findAllService(offset, limit);

        const total = await countCampaign();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previus = offset - limit < 0 ? null : offset - limit;
        const previusUrl = previus != null ? `${currentUrl}?limit=${limit}&offset=${previus}` : null;


        if (campaign.length === 0) {
            return res.status(400).send({ message: " There are no registered Campaign" })
        };

        res.send({
            nextUrl,
            previusUrl,
            limit,
            offset,
            total,

            results: campaign.map((item) => ({
                id: item._id,
                title: item.title,
                description: item.description,
                author: item.author,
                sections: item.sections
            })),
        });

    } catch (err) { return res.status(500).send({ message: err.message }) };
};

const findById = async (req, res) => {
    try {
        const { campaignId } = req.params;

        const campaign = await findByIdService(campaignId);
        if (!campaign) {
            return res.status(400).send({ message: "This campaign does not exist." })
        }

        return res.send({
            Campaign: {
                id: campaign._id,
                title: campaign.title,
                description: campaign.description,
                author: campaign.author,
                sections: campaign.sections
            }
        })

    } catch (err) { return res.status(500).send({ message: err.message }) };
};

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        const campaigns = await searchByTitleService(title);

        if (campaigns.length === 0) {
            return res.status(400).send({ message: "There are no campaigns with this title" })
        }

        res.send({
            results: campaigns.map((item) => ({
                id: item._id,
                title: item.title,
                description: item.description,
                author: item.author,
                sections: item.sections
            }))
        });

    } catch (err) { return res.status(500).send({ message: err.message }) };
};

export default { create, findAll, findById, searchByTitle }; 