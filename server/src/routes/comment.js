import express from 'express';
import { comment } from '../controllers';

import multer from '../utils/multerWrapper';

const router = express.Router();

router.post('/:postId', multer.single(), comment.writeComment);

export default router;