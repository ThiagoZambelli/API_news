import express from 'express';
import connetcDatabase from "./src/database/db.js";
import userRoute from './src/routes/user.route.js';

const app = express();

const port = 3000;


connetcDatabase()
app.use(express.json());


app.use('/user', userRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));