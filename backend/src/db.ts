import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    await mongoose.connect(`mongodb://localhost:27017`);
    console.log("Database connected");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
