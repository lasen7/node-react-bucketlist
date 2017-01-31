import express from 'express';
import { notice } from '../controllers';

const router = express.Router();

router.get('/', notice.getNotices);

export default router;