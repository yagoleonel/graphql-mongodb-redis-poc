import mongoose from "mongoose";
import { User, usersToInsert } from "./models/user.model";

export async function initDatabase(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI!, {
      auth: {
        password: process.env.MONGODB_CONNECT_PASSWORD!,
        username: process.env.MONGODB_CONNECT_USERNAME!,
      },
    });

    await User.insertMany(usersToInsert());
  } catch (error) {
    console.error(error);
    throw error;
  }
}
