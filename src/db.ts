import mongoose from "mongoose";
import { Pokemon, pokemonsToInsert } from "./models/pokemon.model";

export async function initDatabase(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI!, {
      auth: {
        password: process.env.MONGODB_CONNECT_PASSWORD!,
        username: process.env.MONGODB_CONNECT_USERNAME!,
      },
    });

    // seed database
    const isPopulated = await Pokemon.countDocuments()
    if (!isPopulated) {
      await Pokemon.insertMany(pokemonsToInsert());
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
