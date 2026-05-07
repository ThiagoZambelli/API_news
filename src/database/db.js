import mongoose from "mongoose";

//cria conexão com a DB
const connetcDatabase = () => {
    console.log("wait connecting to the database");

    mongoose.connect("mongodb+srv://API_news:admin@cluster0.pyhi6mx.mongodb.net/?appName=Cluster0"
    ).then(() => console.log("MongoDB Atlas Connected")).catch((error) => console.log(error))
};

export default connetcDatabase;