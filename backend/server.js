import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const app = express();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? true  
    : 'http://localhost:4000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging middleware (helpful for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);

if (process.env.NODE_ENV === 'production') {
  const frontendDistPath = path.join(__dirname, 'dist');
  
  console.log('📁 Serving frontend from:', frontendDistPath);
  
  app.use(express.static(frontendDistPath));

  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
  
} else {
  app.get('/', (req, res) => {
    res.send('API is running in development mode...');
  });
}

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ 
      message: `Cannot ${req.method} ${req.path}`,
      error: 'Route not found'
    });
  } else {
    next();
  }
});

// General error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
});