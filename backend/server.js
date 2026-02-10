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

// CORS - Allow all origins in production for testing
app.use(cors({
  origin: true,
  credentials: true,
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logger
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

// ========================================
// API ROUTES - Handle these FIRST
// ========================================
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);

// Test route to verify API is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date() });
});

// ========================================
// FRONTEND - Only in production
// ========================================
if (process.env.NODE_ENV === 'production') {
  const frontendDistPath = path.join(__dirname, 'dist');
  console.log('📁 Frontend path:', frontendDistPath);
  
  // Serve static files ONLY for specific extensions
  // This prevents it from catching /api routes
  app.use('/assets', express.static(path.join(frontendDistPath, 'assets')));
  app.use('/vite.svg', express.static(path.join(frontendDistPath, 'vite.svg')));
  
  // Serve index.html for all other routes (but NOT /api)
  app.get('*', (req, res) => {
    // Double-check it's not an API route
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    console.log('📄 Serving index.html for:', req.path);
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
  
} else {
  app.get('/', (req, res) => {
    res.json({ 
      message: 'API running in development',
      routes: ['/api/auth', '/api/blog', '/api/test']
    });
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(` API Routes: /api/auth, /api/blog`);
});