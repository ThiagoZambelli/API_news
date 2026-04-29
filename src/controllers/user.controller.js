const soma = (req, res) =>{
 const teste = 89 + 2;
    res.send({teste: teste})
};

module.exports = {soma};