import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'password';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1d' });
        res.cookie('admin_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.json({ success: true });
    }
    res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('admin_token');
    res.json({ success: true });
});

// Me route
router.get('/me', (req, res) => {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ loggedIn: false });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ loggedIn: true, username: decoded.username });
    } catch {
        res.status(401).json({ loggedIn: false });
    }
});

export default router; 