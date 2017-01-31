import express from 'express';
import { post } from '../controllers';

import multer from '../utils/multerWrapper';

const router = express.Router();

router.post('/', multer.single('image'), post.writePost);
router.put('/:postId', multer.single('image'), post.editPost);
router.get('/:username/count', post.getPostCount);
router.delete('/:postId', post.deletePost);
router.get('/:username/preview', post.getPreview);
router.put('/:postId/like', post.likePost);
router.delete('/:postId/like', post.unlikePost);
router.get('/:postId', post.getPost);

export default router;