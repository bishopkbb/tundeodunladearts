import { MongoClient, Db } from 'mongodb';

/**
 * MongoDB connection, opened lazily on the first getDb() call.
 *
 * Nothing connects (or throws) when this module is merely imported. That matters because
 * `next build` imports every API route to collect page data: a connection started at import
 * time would hit the database during the build, and an unreachable cluster or a missing
 * MONGODB_URI would then fail the whole deploy instead of only the requests that need it.
 */

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
};

// Keep one client across hot reloads in development (and across calls in production).
const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not configured. Add it to .env.local (and to your hosting environment variables).');
  }

  if (!globalWithMongo._mongoClientPromise) {
    const promise = new MongoClient(uri, options).connect();
    // If the connection fails, forget it so the next request retries instead of reusing a rejected promise.
    promise.catch(() => {
      if (globalWithMongo._mongoClientPromise === promise) globalWithMongo._mongoClientPromise = undefined;
    });
    globalWithMongo._mongoClientPromise = promise;
  }
  return globalWithMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB_NAME || 'toacc');
}
