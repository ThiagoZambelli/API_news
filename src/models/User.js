//Model que controla o modelo que vai conectar com o DB
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        trim: true
    },
},
    {
        timestamps: true
    });

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", UserSchema);

export default User;