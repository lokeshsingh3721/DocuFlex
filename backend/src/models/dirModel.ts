import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
  isFolder: {
    type: Boolean,
    required: true,
  },
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
});

export default mongoose.model("Directory", schema);
