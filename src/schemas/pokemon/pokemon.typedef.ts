export const PokemonTypeDef = `
  input PokemonFilter {
    name: String
    heightMin: Float
    heightMax: Float
    category: String
    weightMin: Float
    weightMax: Float
    typeofpokemon: [String]
    weaknesses: [String]
  }
  
  type Pokemon {
    id: ID!
    name: String!
    imageurl: String!
    height: Float!
    category: String!
    weight: Float!
    typeofpokemon: [String]
    weaknesses: [String]
    evolutions: [String]
    abilities: [String]
  }
  
  type Query {
    pokemons(filter: PokemonFilter): [Pokemon]
  }
`;
