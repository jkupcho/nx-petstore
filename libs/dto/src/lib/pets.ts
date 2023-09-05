import { z } from 'zod';

export const PetSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  age: z.number(),
});

export type Pet = z.infer<typeof PetSchema>;
export const PetIdSchema = PetSchema.pick({ id: true }).required();
export type PetId = z.infer<typeof PetIdSchema>;

export const CreatePetSchema = PetSchema.omit({ id: true }).required();
export type CreatePet = z.infer<typeof CreatePetSchema>;

export const PartialPetSchema = PetSchema.omit({ id: true }).partial().strict();
export type PartialPet = z.infer<typeof PartialPetSchema>;
