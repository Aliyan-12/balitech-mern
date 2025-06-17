import csurf from 'csurf';
import cookieParser from 'cookie-parser';

// Configure CSRF protection
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

// Middleware to handle CSRF errors
const handleCsrfError = (err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      message: 'Invalid or missing CSRF token',
      error: 'CSRF attack detected'
    });
  }
  next(err);
};

export { cookieParser, csrfProtection, handleCsrfError }; 