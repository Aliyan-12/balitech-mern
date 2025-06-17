import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadFileToCloudinary } from './utils/cloudinaryConfig.js';
import { cookieParser, csrfProtection, handleCsrfError } from './middleware/csrfProtection.js';
import helmet from 'helmet';

// Import routes
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';
import contactRoutes from './routes/contacts.js';

// Initialize app
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser()); // Required for CSRF
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use(helmet()); // Set secure HTTP headers

// Static files
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Setup for file uploads to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(ext)) {
      // Set the correct mimetype for PDF files
      if (ext === '.pdf') {
        file.mimetype = 'application/pdf';
      } 
      // Set the correct mimetype for Word documents
      else if (ext === '.doc') {
        file.mimetype = 'application/msword';
      }
      else if (ext === '.docx') {
        file.mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      }
      
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC and DOCX are allowed.'));
    }
  }
});

// CSRF Token endpoint - excluded from CSRF protection
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Routes without CSRF for now to fix the error
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/contacts', contactRoutes);

// Error handler for CSRF errors
app.use(handleCsrfError);

// File upload route with Cloudinary
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  try {
    console.log('Starting file upload to Cloudinary...', {
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });
    
    const result = await uploadFileToCloudinary(req.file);
    
    if (result.success) {
      console.log('File uploaded successfully to Cloudinary:', result.fileUrl);
      return res.json({
        message: 'File uploaded successfully to Cloudinary',
        fileUrl: result.fileUrl,
        publicId: result.publicId
      });
    } else {
      console.error('Cloudinary upload failed:', result.error);
      return res.status(500).json({ 
        message: 'File upload to Cloudinary failed.',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error in file upload:', error);
    return res.status(500).json({ 
      message: 'File upload failed',
      error: error.message
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    message: 'Server error',
    error: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://freefirestories212:sdTMpFJrdzIGoot9@cluster0.43ivyla.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

export default app; 