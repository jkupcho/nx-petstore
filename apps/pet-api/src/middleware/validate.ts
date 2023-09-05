import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const paramsExtractor = (req: Request, res: Response) => req.params;
const bodyExtractor = (req: Request, res: Response) => req.body;

// From: https://jeffsegovia.dev/blogs/rest-api-validation-using-zod#validation-middleware
const zodValidator =
  (
    paramsExtractor: (Request, Response) => any,
    schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(paramsExtractor(req, res));
      next();
    } catch (error) {
      const err = error;
      if (err instanceof z.ZodError) {
        (err) =>
          err.issues.map((e) => ({ path: e.path[0], message: e.message }));
      }
      return res.status(400).json({
        status: 'failed',
        error: err,
      });
    }
  };

export const validate = (
  schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>
) => zodValidator(bodyExtractor, schema);

export const paramsValidate = (
  schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>
) => zodValidator(paramsExtractor, schema);
