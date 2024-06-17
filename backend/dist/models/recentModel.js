import mongoose from "mongoose";
const { Schema } = mongoose;
const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fileId: {
        type: Schema.Types.ObjectId,
        ref: "File",
        require: true,
    },
});
export default mongoose.model("Recent", schema);
