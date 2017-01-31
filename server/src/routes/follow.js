import express from 'express';
import { follow } from '../controllers';

const router = express.Router();

router.post('/:username', follow.follow);
router.delete('/:username', follow.unfollow);
router.get('/:username/follower/count', follow.getFollowerCount);

export default router;