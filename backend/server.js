import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});