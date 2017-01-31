import express from 'express';
import { follow } from '../controllers';

const router = express.Router();

router.post('/:username', follow.follow);
router.delete('/:username', follow.unfollow);

export default router;