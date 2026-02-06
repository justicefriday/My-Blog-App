// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.userId };
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token invalid" });
//   }
// };

import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const result = await pool.query(
      'SELECT id, username, email FROM users WHERE id = $1',
      [decoded.id]
    )

    if (result.rows.length === 0) {
      res.status(401)
      throw new Error('User not found')
    }

    req.user = result.rows[0]
    
    next()
  } catch (error) {
    res.status(401)
    throw new Error('Not authorized, token failed')
  }
})
