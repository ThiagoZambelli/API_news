import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userService from '../services/user.service.js';
dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).send({ message: "Sem token" });
        };
        const parts = authorization.split(" ");

        if (parts.length !== 2) {
            return res.status(401).send({ message: "Token com confguração errada" });
        };

        const [schema, token] = parts;

        if (schema !== "Bearer") {
            return res.status(401).send({ message: "Token sem Schema correto" });
        };

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Token invalid!" });
            };

            const user = await userService.findByIdService(decoded.id);

            if (!user) {
                return res.status(401).send("Usuario não encontrado")
            };

            req.userId = user.id
            next();
        });

    } catch (err) { res.status(500).send({ message: err.message }) };
};