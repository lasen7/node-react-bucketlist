import express from 'express';
import { report } from '../controllers';

const router = express.Router();

router.post('/post/:postId', report.reportPost);

export default router;