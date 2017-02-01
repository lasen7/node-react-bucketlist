import express from 'express';
import { post } from '../controllers';

import multer from '../utils/multerWrapper';

const router = express.Router();

router.get('/', post.handleGetPosts);
router.get('/:listType/:postId', post.handleGetPostsByType);
router.get('/:username/count', post.getPostCount);
router.get('/:username/preview', post.getPreview);
router.get('/:postId', post.getPost);

router.post('/', multer.single('image'), post.writePost);

router.put('/:postId', multer.single('image'), post.editPost);
router.put('/:postId/like', post.likePost);

router.delete('/:postId', post.deletePost);
router.delete('/:postId/like', post.unlikePost);


export default router;