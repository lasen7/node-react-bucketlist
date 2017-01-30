import express from 'express';
import { post } from '../controllers';

import multer from '../utils/multerWrapper';

const router = express.Router();

router.post('/', multer.single('image'), post.writePost);
router.put('/:postId', multer.single('image'), post.editPost);

export default router;