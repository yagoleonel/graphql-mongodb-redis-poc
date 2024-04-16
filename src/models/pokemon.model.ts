import fs from "fs";
import mongoose, { Schema } from "mongoose";
import { IPokemon } from "../types/pokemon.types";
const { Types } = Schema;

const pokemonSchema = new Schema({
  name: { 
    type: Types.String, 
    required: true 
  },
  id: { 
    type: Types.String, 
    required: true 
  },
  imageUrl: { 
    type: Types.String,
  },
  height: { 
    type: Types.Number, 
    required: true 
  },
  category: { 
    type: Types.String, 
    required: true 
  },
  weight: { 
    type: Types.Number, 
    required: true 
  },
  types: { 
    type: [Types.String], 
    required: true 
  },
  weaknesses: { 
    type: [Types.String], 
    required: true 
  },
  evolutions: { 
    type: [Types.String], 
    required: true 
  },
  abilities: { 
    type: [Types.String], 
    required: true 
  },
});

pokemonSchema.index({ id: 1 }, { unique: true });

export const Pokemon = mongoose.model('Pokemon', pokemonSchema);

function parseHeight(height: string): number {
  // Split the height into feet and inches
  const [feet, inches] = height.split("'");
  // Convert feet and inches to centimeters
  const totalInches = parseInt(feet) * 12 + parseInt(inches);
  const centimeters = totalInches * 2.54; // 1 inch = 2.54 centimeters
  return centimeters;
}

// Function to parse weight from pounds to kilograms
function parseWeight(weight: string): number {
  // Remove "lbs" from the weight string and parse it to float
  const pounds = parseFloat(weight.replace("lbs", ""));
  // Convert pounds to kilograms
  const kilograms = pounds * 0.453592; // 1 pound = 0.453592 kilograms
  return kilograms;
}

// database extracted from https://www.kaggle.com/datasets/jatinhabibkar/pokemondata
const data = fs.readFileSync('./pokemon-seed.json', 'utf-8')
export const pokemonsToInsert = () => {
  const parsedData = JSON.parse(data)
  return parsedData.map((pokemon: IPokemon) => {
    pokemon.height = parseHeight(`${pokemon.height}`)
    pokemon.weight = parseWeight(`${pokemon.weight}`)
    return pokemon
  })
}

