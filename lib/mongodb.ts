import mongoose from 'mongoose'
import { withTimeout } from '@/lib/with-timeout'

const CONNECT_TIMEOUT_MS = 4000

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

function mongoUri(): string {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }
  return uri
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: CONNECT_TIMEOUT_MS,
      connectTimeoutMS: CONNECT_TIMEOUT_MS,
      socketTimeoutMS: 10000,
      maxPoolSize: 8,
      // Atlas SRV can return unreachable IPv6; IPv4 fails in 4s instead of hanging.
      family: 4 as const,
    }

    cached.promise = mongoose
      .connect(mongoUri(), opts)
      .then((connection) => {
        cached.conn = connection
        return connection
      })
      .catch((error) => {
        cached.promise = null
        cached.conn = null
        throw error
      })
  }

  return withTimeout(cached.promise, CONNECT_TIMEOUT_MS + 500, 'MongoDB connect')
}

export default dbConnect
