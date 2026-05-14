import express from 'express';
import connetcDatabase from "./src/database/db.js";
import dotenv from 'dotenv';

import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import chapterRoute from './src/routes/chapter.route.js';
import campaignRoute from './src/routes/campaign.route.js';
import sectionRoute from './src/routes/section.route.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;


connetcDatabase()
app.use(express.json());

app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/chapter', chapterRoute);
app.use('/campaign', campaignRoute);
app.use('/section', sectionRoute);


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));