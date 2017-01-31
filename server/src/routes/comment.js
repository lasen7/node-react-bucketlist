import express from 'express';
import { comment } from '../controllers';

import multer from '../utils/multerWrapper';

const router = express.Router();

router.post('/:postId', multer.single(), comment.writeComment);
router.get('/:postId', comment.getComments);

export default router;