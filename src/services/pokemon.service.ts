import { IPokemon, PokemonFilter } from "../types";
import { Pokemon } from "../models";
import { RedisClient } from "../lib/redis.client";
import crypto from "crypto";
import { FilterQuery } from "mongoose";

export class PokemonService {
  private static instance: PokemonService;

  private constructor() {}

  public static getInstance(): PokemonService {
    if (!PokemonService.instance) {
      PokemonService.instance = new PokemonService();
    }
    return PokemonService.instance;
  }

  public getHashKey(filter: PokemonFilter): string {
    let hashKey = "";
    if (filter) {
      const text = JSON.stringify(filter);
      hashKey = crypto.createHash("sha256").update(text).digest("hex");
    }
    return "CACHE_POKEMON_" + hashKey;
  }

  public async getAll(filter: PokemonFilter): Promise<IPokemon[]> {
    try {
      const cacheHashKey = this.getHashKey(filter);
      const cacheData = await RedisClient.get(cacheHashKey);
      if (cacheData) {
        return JSON.parse(cacheData) as IPokemon[];
      }

      const query = this.buildFilter(filter);
      const pokemons = await Pokemon.find<IPokemon>(query);
      if (pokemons && pokemons.length) {
        await RedisClient.set(cacheHashKey, JSON.stringify(pokemons), {
          EX: 60 * 5, // cache expiration in seconds
        });
      }

      return pokemons;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private buildFilter(filter: PokemonFilter): FilterQuery<IPokemon> {
    const query: FilterQuery<IPokemon> = Object.assign({}, filter);
    
    if ('heightMax' in query) {
      query.height = query.height || {}
      query.height.$lte = filter.heightMax
      delete query.heightMax;
    }
    if ('heightMin' in query) {
      query.height = query.height || {}
      query.height.$gte = filter.heightMin
      delete query.heightMin;
    }
    if ('weightMax' in query) {
      query.weight = query.weight || {}
      query.weight.$lte = filter.weightMax
      delete query.weightMax;
    }
    if ('weightMin' in query) {
      query.weight = query.weight || {}
      query.weight.$gte = filter.weightMin
      delete query.weightMin;
    }

    return query
  }
}
