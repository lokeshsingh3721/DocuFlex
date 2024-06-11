import mongoose from "mongoose";
const schema = new mongoose.Schema({
    first: {
        type: String,
        required: true,
    },
    last: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
export default mongoose.model("User", schema);
