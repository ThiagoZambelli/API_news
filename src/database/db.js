import mongoose from "mongoose";

//cria conexão com a DB
const connetcDatabase = () => {
    console.log("wait connecting to the database");

    mongoose.connect(
      process.env.MONGODB_URI
    ).then(() => console.log("MongoDB Atlas Connected")).catch((error) => console.log(error))
};

export default connetcDatabase;