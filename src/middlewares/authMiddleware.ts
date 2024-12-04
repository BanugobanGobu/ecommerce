import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface AuthenticatedRequest extends Request {
    user?: string;
}

export class AuthMiddleware {
    public authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Ask Mr Banugoban to Login') as { id: string };
            req.user = decoded.id;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    }
}

export default new AuthMiddleware();
