//execução da lógica das rotas
import userService from '../services/user.service.js';

//controller da rota de criação de usuarios
const create = async (req, res) => {
    console.log("aqui!!!!!!!!!")
    try {
        const { name, userName, password, email } = req.body;
        //verifica se não esta faldo nenhum dos campos enviados no body
        if (!name || !userName || !password || !email) {
            res.status(400).send({ message: "submit all fields for registrantions." })
        };

        //chama o service que faz a conexão com o DB
        const user = await userService.createService(req.body);

        //caso de problema no Service retorna uma menssagem de erro
        if (!user) {
            return res.status(400).send({ message: "Error creating User" })
        }

        // caso não tenha problemas na criação retorna uma menssagem de sucesso para o cliente
        res.status(201).send({
            message: "user created sucessfuly",

            user: {
                id: user._id,
                name,
                userName,
                email
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    };
};

//Controler da rota de chamar todos os usuarios
const findAll = async (req, res) => {
    try {
        //chama o service que conecta com o DB para trazer a lista de usuarios cadastrados
        const users = await userService.findAllService();

        //verifica se alista n esta vazia, se sim manda uma menssagem de erro para o cliente
        if (users.length === 0) {
            return res.status(400).send({ message: "There are no registered users" })
        }

        //caso a lsita não esteja vazia retorna a mesma para o cliente 
        res.send(users);
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

//controller que busaca o usuario pelo ID
const findById = async (req, res) => {
    try {
        //pega o usuario q foi enviado na Req pelo middleware
        const user = req.user;

        //retorna o usuario para o cliente
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

//controller que faz update no usuario
const updateById = async (req, res) => {
    try {
        //pega oq foi enviado no body da req
        const { name, email, userName, password } = req.body;

        //verifica se foi enviado ao menos 1 item pra atualizar
        if (!name && !userName && !email && !password) {
            res.status(400).send({ message: " Submit at least one field for UpDate" });
        };

        //pega id e user ja validados pelo middleware
        const { id, user } = req;


        //cahma o service que faz o update enviado o que veio de alteração no body
        await userService.updateService(
            id,
            name,
            userName,
            email,
            password
        )

        //retorna menssagem de sucesso caso n tenha erros
        res.send({ message: "User sucessfully update!" });
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

export default { create, findAll, findById, updateById };