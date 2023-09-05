import type { CreatePet, Pet, PartialPet } from './model';

import { getClient } from '../client';

const client = getClient();

export type PageRequest = {
  limit: number;
  offset: number;
};

const defaultPage: PageRequest = {
  limit: 25,
  offset: 0,
};

export async function getAllPets(
  pageRequest: PageRequest = defaultPage
): Promise<Pet[]> {
  const page = { ...defaultPage, ...pageRequest };
  return client.pet.findMany({
    skip: page.offset,
    take: page.limit,
  });
}

export async function createPet({ name, age }: CreatePet): Promise<Pet> {
  return client.pet.create({
    data: {
      name,
      age,
    },
  });
}

export async function getPet(id: string): Promise<Pet | null> {
  return await client.pet.findUnique({
    where: {
      id,
    },
  });
}

export async function deletePet(id: string): Promise<void> {
  const exists = await petExists(id);
  if (exists) {
    await client.pet.delete({
      where: {
        id,
      },
    });
  }
}

export async function petExists(id: string): Promise<boolean> {
  return !!(await getPet(id));
}

export async function updatePet(
  id: string,
  pet: PartialPet
): Promise<Pet | null> {
  const exists = await petExists(id);
  if (exists) {
    return await client.pet.update({
      where: {
        id,
      },
      data: { ...pet },
    });
  }
}
