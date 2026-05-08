import bcrypt from 'bcrypt';
import { loginService } from '../services/auth.service.js'

const login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await loginService(userName);

        if (!user) {
            return res.status(404).send({ message: "Invalid User or Password!" });
        };

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(404).send({ message: "Invalid User or Password!" });
        };

        //res.send({message: "login OK"});
        res.send(passwordIsValid);
    } catch (err) { res.satus(500).send({ message: err.message }) }
}

export {
    login
}