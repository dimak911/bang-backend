import Redis from 'ioredis';

import { REDIS_LINK } from './index';

const redis = new Redis(REDIS_LINK);

export default redis;
