import redis from '../config/redis.config';

export async function setData<T>(key: string, data: T): Promise<void> {
  redis.set(key, JSON.stringify(data));
}

export async function getDataByKey<T>(key: string): Promise<null | T> {
  const state = await redis.get(key);

  if (state === null) return state;

  return JSON.parse(state);
}

export async function deleteDataByKey(key: string): Promise<void> {
  await redis.del(key);
}
