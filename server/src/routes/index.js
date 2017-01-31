import express from 'express';
import account from './account';
import post from './post';
import comment from './comment';

const router = express.Router();

router.use('/account', account);
router.use('/post', post);
router.use('/comment', comment);

export default router;