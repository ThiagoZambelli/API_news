import bcrypt from 'bcrypt';
import { generateToken, loginService } from '../services/auth.service.js'

const login = async (req, res) => {
    const {body} = req;
    if (!body) {
        res.status(400).send({ message: "submit all fields for Login" })
    }
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {            
            res.status(400).send({ message: "submit all fields for Login" })
        };

        const user = await loginService(userName);

        if (!user) {
            return res.status(404).send({ message: "Invalid User or Password!" });
        };

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(404).send({ message: "Invalid User or Password!" });
        };

        //res.send({message: "login OK"});
        const token = generateToken(user.id);
        res.send({ token });
    } catch (err) { return res.status(500).send({ message: err.message }) }
}


export {
    login
}