import { PrismaClient } from '@prisma/client';

let client: PrismaClient;

export function getClient(): PrismaClient {
  if (client === undefined) {
    client = new PrismaClient();
  }
  return client;
}
