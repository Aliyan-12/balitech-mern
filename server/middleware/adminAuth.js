import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export function adminAuth(req, res, next) {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        req.admin = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ message: 'Unauthorized' });
    }
} 