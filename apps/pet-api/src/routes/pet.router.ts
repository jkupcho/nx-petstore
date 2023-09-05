import express from 'express';
import petController from '../controllers/pet.controller';
import { paramsValidate, validate } from '../middleware/validate';
import { CreatePetSchema, PetIdSchema } from '@petstore/db/pets';

const petRouter = express.Router();

const createPetValidate = validate(CreatePetSchema);

petRouter
  .route('/')
  .get(petController.getAll)
  .post(createPetValidate, petController.create);

petRouter
  .route('/:id')
  .all(paramsValidate(PetIdSchema))
  .get(petController.findOne)
  .delete(petController.handleDelete);

export default petRouter;
