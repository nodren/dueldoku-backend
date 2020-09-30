import { Injectable } from '@nestjs/common'
import * as redis from 'redis'

@Injectable()
export class RedisService {
	private redis: redis.RedisClient
	constructor() {
		this.redis = redis.createClient()
	}

	public async del(key: string | string[]) {
		return new Promise(resolve => {
			this.redis.del(key, (err, res) => {
				if (err) {
					resolve()
				}
				resolve(res)
			})
		})
	}

	public async get(key: string): Promise<string | undefined> {
		return new Promise(resolve => {
			this.redis.get(key, (err, res) => {
				if (err) {
					resolve()
				}
				resolve(res as any)
			})
		})
	}

	public async getJSON<T>(key: string): Promise<T | undefined> {
		const res = await this.get(key)
		if (res) {
			return JSON.parse(res)
		}
	}

	public async mget(key: string[]): Promise<string[]> {
		return new Promise(resolve => {
			this.redis.mget(key, (err, res) => {
				if (err) {
					resolve([])
				}
				resolve(res)
			})
		})
	}

	public async mgetJSON<T>(key: string[]): Promise<T[]> {
		const res = await this.mget(key)
		if (res) {
			return res.map(r => JSON.parse(r))
		}
		return []
	}

	public async set(key: string, value: string) {
		return new Promise(resolve => {
			this.redis.set(key, value, (err, res) => {
				if (err) {
					resolve()
				}
				resolve(res)
			})
		})
	}

	public async setJSON<T>(key: string, value: T) {
		await this.set(key, JSON.stringify(value))
	}

	public async flushdb(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.redis.flushdb(err => {
				if (err) {
					reject()
				}
				resolve(true)
			})
		})
	}

	public async sadd(key: string, value: string) {
		return new Promise(resolve => {
			this.redis.sadd(key, value, (err, res) => {
				if (err) {
					resolve()
				}
				resolve(res)
			})
		})
	}

	public async smembers(key: string): Promise<string[]> {
		return new Promise(resolve => {
			this.redis.smembers(key, (err, res) => {
				if (err) {
					resolve()
				}
				resolve(res)
			})
		})
	}

	public async srem(key: string, value: string) {
		return new Promise(resolve => {
			this.redis.srem(key, value, (err, res) => {
				if (err) {
					resolve()
				}
				resolve(res)
			})
		})
	}

	public async hset(key: string, field: string, value: string) {
		return new Promise(resolve => {
			this.redis.hset(key, field, value, (err, res) => {
				if (err) {
					resolve()
				}
				resolve(res)
			})
		})
	}

	public async hget(key: string, field: string): Promise<string | undefined> {
		return new Promise(resolve => {
			this.redis.hget(key, field, (err, res) => {
				if (err) {
					resolve()
				}
				resolve(res)
			})
		})
	}
}
