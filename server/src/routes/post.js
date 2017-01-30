import express from 'express';
import { post } from '../controllers';

import multer from '../utils/multerWrapper';

const router = express.Router();

router.post('/', multer.single('image'), post.writePost);
router.put('/:postId', multer.single('image'), post.editPost);
router.get('/:username/count', post.getPostCount);
router.delete('/:postId', post.deletePost);
router.get('/:username/preview', post.getPreview);

export default router;