import redis from '../config/redis.config';
import { RoomType } from './room/types/room.type';

export namespace RedisService {
  const getRoomCacheKey = (roomId: string): string => {
    return `room-${roomId}`;
  };

  export async function setData<T>(key: string, data: T): Promise<void> {
    redis.set(key, JSON.stringify(data));
  }

  export async function getDataByKey<T>(key: string): Promise<null | T> {
    const state = await redis.get(key);

    if (state === null) return state;

    return JSON.parse(state);
  }

  export async function getKeysByPrefix(prefix: string): Promise<string[]> {
    return redis.keys(`${prefix}*`);
  }

  export async function deleteDataByKey(key: string): Promise<void> {
    await redis.del(key);
  }

  export async function getRoomCache(roomId: string): Promise<RoomType | null> {
    return getDataByKey<RoomType>(getRoomCacheKey(roomId));
  }

  export async function setRoomCache(
    roomId: string,
    room: RoomType,
  ): Promise<void> {
    await setData<RoomType>(getRoomCacheKey(roomId), room);
  }
}
