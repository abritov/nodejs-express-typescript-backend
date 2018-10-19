import User from './User'

export interface StorageApi {
  get(key: string): string
  set(key: string, value: string, ttl?: number): boolean
  exists(key: string): boolean
}

let redis: StorageApi

export default {
  User: User(redis)
}