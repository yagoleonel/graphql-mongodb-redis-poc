import { PokemonService } from "../../services";
import { PokemonFilter } from "../../types";

type PokemonFilterArg = { filter: PokemonFilter }

export const PokemonResolvers = {
  Query: {
    pokemons(_: never, { filter }: PokemonFilterArg) {
      return PokemonService.getInstance().getAll(filter)
    },
  }
};