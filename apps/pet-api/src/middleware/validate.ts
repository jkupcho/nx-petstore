import type { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

// From: https://jeffsegovia.dev/blogs/rest-api-validation-using-zod#validation-middleware
export const validate =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
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

export const paramsValidate =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.params);
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
