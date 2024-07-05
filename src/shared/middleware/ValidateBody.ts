// middleware/ValidateBody.ts
import { type ClassConstructor, plainToInstance } from "class-transformer";
import { type ValidationError, validateSync } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";

function formatValidationErrors(
  errors: ValidationError[],
): Record<string, { message: string; value: string }> {
  const fieldsErrors: Record<string, { message: string; value: string }> = {};
  // biome-ignore lint/complexity/noForEach: <explanation>
  errors.forEach((error) => {
    if (error.constraints) {
      fieldsErrors[error.property] = {
        message: Object.values(error.constraints).join(", "),
        value: error.value as string,
      };
    }

    if (error.children) {
      // biome-ignore lint/complexity/noForEach: <explanation>
      error.children.forEach((errorNested) => {
        if (errorNested.constraints) {
          fieldsErrors[errorNested.property] = {
            message: Object.values(errorNested.constraints).join(", "),
            value: errorNested.value as string,
          };
        }
      });
    }
  });

  return fieldsErrors;
}

export function ValidateBody<T extends object>(
  targetClass: ClassConstructor<T>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const instance = plainToInstance(targetClass, req.body);
      const errors = validateSync(instance, {
        forbidUnknownValues: true,
        validationError: { target: false },
      });
      if (errors.length) {
        const fieldsErrors = formatValidationErrors(errors);
        next(new ValidateError(fieldsErrors, "Validation failed"));
        return;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
