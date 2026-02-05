import db from '../config/db.js';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToke.js';  

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
   
    if (!username || !email || !password) {
  return res.status(400).json({ message: 'Please provide all required fields' });
}
// checking email to avoid double user
const emailCheck = await db.query(
  'SELECT id FROM users WHERE email = $1',
  [email]
);

if (emailCheck.rows.length > 0) {
  return res.status(400).json({ message: 'Email already exists' });
}

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
        [username, email, hashedPassword]
    );

    generateToken(res, result.rows[0].id);

    res.status(201).json(result.rows[0]);
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    if (result.rows.length === 0) {
        res.status(400);
        throw new Error('Invalid email or password');
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(400);
        throw new Error('Invalid email or password');
    }

    generateToken(res, user.id);

    res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
});


export const logoutUser = asyncHandler(async (req, res) => {
  
    res.clearCookie('jwt', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
});
    res.json({ message: 'Logout successful' });
});

export const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const result = await db.query(
        'SELECT id, username, email FROM users WHERE id = $1',
        [userId]
    );

    res.json(result.rows[0]);
});

export const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { username, email, password } = req.body; 
    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }
    const result = await db.query(
        'UPDATE users SET username = $1, email = $2, password = COALESCE($3, password) WHERE id = $4 RETURNING id, username, email',
        [username, email, hashedPassword, userId]
    );
    res.json(result.rows[0]);
});