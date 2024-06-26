import mongoose from "mongoose";
const { Schema } = mongoose;
const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Directory",
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    lastEdit: {
        type: Date,
        default: Date.now(),
    },
    size: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fileType: {
        type: String,
        enum: ["image", "video", "document", "others"],
        required: true,
    },
});
export default mongoose.model("File", schema);
