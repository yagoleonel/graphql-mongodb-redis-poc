import { PokemonResolvers, PokemonTypeDef } from "./pokemon";

export const typeDefs = [PokemonTypeDef]
export const resolvers = Object.assign({}, PokemonResolvers)