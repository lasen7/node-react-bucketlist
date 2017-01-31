import express from 'express';
import { follow } from '../controllers';

const router = express.Router();

router.post('/:username', follow.follow);
router.delete('/:username', follow.unfollow);
router.get('/:username/follower/count', follow.getFollowerCount);
router.get('/:username/followee/count', follow.getFolloweeCount);

router.get('/:username/follower', follow.getFollowers);
router.get('/:username/followee', follow.getFollowees);

export default router;