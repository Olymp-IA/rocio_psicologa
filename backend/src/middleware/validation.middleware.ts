import { Request, Response, NextFunction } from 'express';

type ValidationSchema = {
    [key: string]: {
        required?: boolean;
        type?: 'string' | 'number' | 'boolean' | 'email';
        minLength?: number;
        maxLength?: number;
    };
};

export const validate = (schema: ValidationSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: string[] = [];

        for (const [field, rules] of Object.entries(schema)) {
            const value = req.body[field];

            if (rules.required && (value === undefined || value === null || value === '')) {
                errors.push(`El campo "${field}" es requerido`);
                continue;
            }

            if (value !== undefined && value !== null && value !== '') {
                if (rules.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        errors.push(`El campo "${field}" debe ser un email válido`);
                    }
                }

                if (rules.type === 'string' && typeof value !== 'string') {
                    errors.push(`El campo "${field}" debe ser texto`);
                }

                if (rules.type === 'number' && typeof value !== 'number') {
                    errors.push(`El campo "${field}" debe ser un número`);
                }

                if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
                    errors.push(`El campo "${field}" debe tener al menos ${rules.minLength} caracteres`);
                }

                if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
                    errors.push(`El campo "${field}" debe tener máximo ${rules.maxLength} caracteres`);
                }
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        next();
    };
};
