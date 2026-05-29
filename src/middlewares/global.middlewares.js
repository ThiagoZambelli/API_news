//Middlewares globais, que vao atuar entre as rotas e oa controllers
import mongoose from "mongoose";
import  userService from "../services/user.service.js";

//realiza a validação do ID que chega via parametro
export const validId = (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID!" });
        };

        //retorna o id validado pro next na req
        req.id = id;
        next();
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

//realiza a validação do usuario pelo ID
export const validUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userService.findByIdService(id);

        if (!user) {
            return res.status(400).send({ message: "User not found" });
        };

        //retorna o id e o usuario validado pelo next na req
        req.id = id;
        req.user = user;        
        next();
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};



