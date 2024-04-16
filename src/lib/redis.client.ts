import { RedisClientType, SetOptions, createClient } from "redis";

export class RedisClient {
  private static client: RedisClientType
  
  private constructor(){}

  private static async getClient(): Promise<RedisClientType> {
    if (!RedisClient.client) {
      RedisClient.client = createClient({
        url: process.env.REDIS_CONNECT_URI,
      });
    }
    if (!RedisClient.client.isOpen) {
      await RedisClient.client.connect()
    }
    return RedisClient.client
  }

  public static async get(key: string): Promise<string | null> {
    try {
      const client = await RedisClient.getClient()
      return client.get(key)
    } catch (error) {
      console.error('Error getting data from cache', error)
      throw error
    }
  }

  public static async set(key: string, value: string, opts: SetOptions | undefined): Promise<string | null> {
    try {
      const client = await RedisClient.getClient()
      return client.set(key, value, opts) 
    } catch (error) {
      console.error('Error saving data to cache', error)
      throw error
    }
  }
}