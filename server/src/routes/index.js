import express from 'express';
import account from './account';
import post from './post';
import comment from './comment';
import follow from './follow';
import goal from './goal';
import bookmark from './bookmark';
import notice from './notice';
import report from './report';
import tag from './tag';

const router = express.Router();

router.use('/account', account);
router.use('/post', post);
router.use('/comment', comment);
router.use('/follow', follow);
router.use('/goal', goal);
router.use('/bookmark', bookmark);
router.use('/notice', notice);
router.use('/report', report);
router.use('/tag', tag);

export default router;