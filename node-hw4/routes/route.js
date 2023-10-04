import express from 'express';
import { getNewsPosts, getNewsPostById, createNewsPost, updateNewsPost, deleteNewsPost } from '../contollers/newsPostsController.js';

const router = express.Router();

router.get('/api/newsposts', getNewsPosts);
router.get('/api/newsposts/:id', getNewsPostById);
router.post('/api/newsposts', createNewsPost);
router.put('/api/newsposts/:id', updateNewsPost);
router.delete('/api/newsposts/:id', deleteNewsPost);

export default router;