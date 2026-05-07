const userService = require('../services/user.service');
const mongoose = require("mongoose");

const create = async (req, res) => {
    const { name, userName, password, email } = req.body;

    if (!name || !userName || !password || !email) {
        res.status(400).send({ message: "submit all fields for registrantions." })
    };


    const user = await userService.createService(req.body);

    if (!user) {
        return res.status(400).send({ message: "Error creating User" })
    }

    res.status(201).send({
        message: "user created sucessfuly",

        user: {
            id: user._id,
            name,
            userName,
            email
        }
    })
};

const findAll = async (req, res) => {
    const users = await userService.findAllService();

    if (users.length === 0) {
        return res.status(400).send({ message: "There are no registered users" })
    }

    res.send(users)

};

const findById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "invalid ID" })
    }

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).send({ message: "User not found" });
    }

    res.send(user);
}

const updateById = async (req, res) => {
    const { name, email, userName, password } = req.body;
    const id = req.params.id;

    if (!name && !email && !userName && !password) {
        res.status(400).send({ message: "submit at least one field for Update" });
    };

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID" });
    }

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).send({ message: "User not found" });
    };

    await userService.updateService(
        id,
        name,
        userName,
        email,
        password
    )

    res.send({message: "User sucessfully update!"});
};

module.exports = { create, findAll, findById, updateById };