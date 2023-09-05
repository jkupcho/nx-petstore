import type { RequestHandler } from 'express';
import type { CreatePet } from '@petstore/db/pets';
import { getAllPets, createPet, deletePet, getPet } from '@petstore/db/pets';

const getAll: RequestHandler = async (req, res) => {
  const pets = await getAllPets();
  res.json(pets);
};

const create: RequestHandler = async (req, res) => {
  const petRequest = req.body as CreatePet;
  const result = await createPet(petRequest);

  res.location(`${req.url}/${result.id}`).sendStatus(201);
};

const handleDelete: RequestHandler = async (req, res) => {
  const { id } = req.params as { id: string };
  await deletePet(id);

  res.sendStatus(204);
};

const findOne: RequestHandler = async (req, res) => {
  const { id } = req.params as { id: string };

  const pet = await getPet(id);

  if (pet === null) {
    res.sendStatus(404);
  } else {
    res.json(pet);
  }
};

const petController = {
  getAll,
  create,
  handleDelete,
  findOne,
};

export default petController;
