import express from 'express';
import { createPost, getAllPosts, getPostById, getPostsByUser,updatePost,deletePost} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my-blogs', protect, getPostsByUser); 
router.post('/create', protect, createPost);
router.get('/',  getAllPosts);
router.get('/:id', getPostById); 
router.put('/:id',protect,updatePost)
router.delete('/:id', protect, deletePost);

export default router;