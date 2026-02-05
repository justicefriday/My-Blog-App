import asyncHandler from 'express-async-handler';
import db from '../config/db.js';

// Create a new post
export const createPost = asyncHandler(async (req, res) => {
  const userId = req.user.id;  // Assume auth middleware sets req.user
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please provide title and content');
  }

  const result = await db.query(
    'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
    [userId, title, content]
  );

  res.status(201).json(result.rows[0]);
});

export const getAllPosts = asyncHandler(async (req, res) => {
  const result = await db.query(
    `SELECT posts.*, users.username 
     FROM posts 
     JOIN users ON posts.user_id = users.id
     ORDER BY posts.created_at DESC`
  );
  
  res.json(result.rows);
});

// Get a single post by ID (only if it belongs to user)
export const getPostById = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  const result = await db.query(
    `SELECT posts.*, users.username 
     FROM posts 
     JOIN users ON posts.user_id = users.id
     WHERE posts.id = $1`,
    [postId]
  );

  if (result.rows.length === 0) {
    res.status(404);
    throw new Error('Post not found');
  }

  res.json(result.rows[0]);
});
export const getPostsByUser = asyncHandler(async (req, res) => {
  const userId = req.user.id; // or from req.user.id if authenticated

  const result = await db.query(
    'SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );

  res.json(result.rows);
});

export const updatePost = asyncHandler(async (req, res) => {
  

  const userId = req.user.id;
  const postId = parseInt(req.params.id); 
  const { title, content } = req.body;


  // Validate inputs
  if (!title || !content) {
    res.status(400);
    throw new Error('Title and content are required');
  }

  if (isNaN(postId)) {
    res.status(400);
    throw new Error('Invalid post ID');
  }

  try {
    const postCheck = await db.query(
      'SELECT * FROM posts WHERE id = $1 AND user_id = $2',
      [postId, userId]
    );


    if (postCheck.rows.length === 0) {
      res.status(404);
      throw new Error('Post not found or not authorized');
    }

    
    const updatedPost = await db.query(
      'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, postId]
    );


    res.json(updatedPost.rows[0]);
    
  } catch (error) {
    
    throw error;
  }
});


// Delete a post (only if it belongs to user)
export const deletePost = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  // Check post ownership
  const postCheck = await db.query(
    'SELECT * FROM posts WHERE id = $1 AND user_id = $2',
    [postId, userId]
  );

  if (postCheck.rows.length === 0) {
    res.status(404);
    throw new Error('Post not found or not authorized');
  }

  await db.query(
    'DELETE FROM posts WHERE id = $1',
    [postId]
  );

  res.json({ message: 'Post deleted successfully' });
});
