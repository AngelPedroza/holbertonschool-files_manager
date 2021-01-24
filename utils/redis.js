import redis from "redis";


class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on("error", error => {
            console.error(error);
        });
    }

    isAlive() {
        return new Promise((resolve, reject) => {
            this.client.on('connect', err => {
                if (err) reject(false);
                resolve(true);
            })
        });
    }

    async set(key, value, ttl) {
        this.client.setex(key, ttl, value);
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, reply) => {
                if (err) reject();
                resolve(reply);
            })
        });
    }

    async del(key) {
        return this.client.del(key=key)
    }
}
const redisClient = new RedisClient();
export default redisClient;