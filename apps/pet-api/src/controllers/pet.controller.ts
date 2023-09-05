import type { RequestHandler } from 'express';
import type { CreatePet, PartialPet, PetId } from '@petstore/dto';
import {
  getAllPets,
  createPet,
  deletePet,
  getPet,
  updatePet,
} from '@petstore/db/pets';

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
  const { id } = req.params as PetId;
  await deletePet(id);

  res.sendStatus(204);
};

const update: RequestHandler = async (req, res) => {
  const { id } = req.params as PetId;
  const partial = req.body as PartialPet;

  const result = await updatePet(id, partial);
  if (result === null) {
    res.sendStatus(404);
  } else {
    res.status(200).json(result);
  }
};

const findOne: RequestHandler = async (req, res) => {
  const { id } = req.params as PetId;

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
  update,
};

export default petController;
