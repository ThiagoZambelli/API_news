
const create = (req, res) => {
    const {name, userName, password, email} = req.body;

    if (!name || !userName || !password || !email){
        res.status(400).send({message:"submit all fields for registrantions."})
    };


    
    res.status(201).send({
        message: "user created sucessfuly",
    
        user:{
            name,
            userName,
            email,
            password:"*******"
        }        
    })
};

module.exports = {create};