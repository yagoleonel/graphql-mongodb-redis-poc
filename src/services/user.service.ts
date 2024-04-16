import { IUser, UserFilter } from "../types/user.types";
import { User } from "../models";
import crypto from 'crypto'
import { RedisClient } from "../lib/redis.client";

export class UserService {
  private static instance: UserService;

  private constructor(){}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  public getHashKey(filter: UserFilter): string {
    let retKey = '';
    if (filter) {
      const text = JSON.stringify(filter);
      retKey = crypto.createHash('sha256').update(text).digest('hex');
    }
    return 'CACHE_USER_' + retKey;
  }

  public async getAll(filter: UserFilter): Promise<IUser[]> {
    try {
      const cacheHashKey = this.getHashKey(filter)
      const cacheData = await RedisClient.get(cacheHashKey);
      if (cacheData) {
        return JSON.parse(cacheData) as IUser[];
      }

      const query = Object.assign({}, filter)
      const users = await User.find<IUser>(query)
      if (users && users.length) {
        await RedisClient.set(cacheHashKey, JSON.stringify(users), {
          EX: 60 * 5 // cache expiration in seconds
        })
      }

      return users;
    } catch (error) {
      console.error(error)
      throw error;
    }
  }
}